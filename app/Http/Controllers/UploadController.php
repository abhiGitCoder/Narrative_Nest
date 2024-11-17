<?php

namespace App\Http\Controllers;

use App\Models\UserUpload;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class UploadController extends Controller
{
    /**
     * Allowed audio file types
     */
    private const ALLOWED_AUDIO_TYPES = [
        'audio/mpeg',
        'audio/wav',
        'audio/ogg',
        'audio/m4a',
        'audio/x-m4a',
        'audio/mpa',
        'audio/x-mpegurl',
        'audio/mp4',
        'audio/aac'
    ];

    /**
     * Maximum file size in bytes (50MB)
     */
    private const MAX_FILE_SIZE = 52428800;

    /**
     * Handle the upload request
     */
    public function upload(Request $request): JsonResponse
    {
        try {
            // Validate request
            $validator = Validator::make($request->all(), [
                'content_type' => 'required|in:story,podcast,music',
                'genres' => 'required|string|max:255',
                'title' => 'required|string|max:255',
                'description' => 'required|string',
                'audio_file' => [
                    'required',
                    'file',
                    'mimes:mp3,wav,ogg,m4a',
                    'max:' . (self::MAX_FILE_SIZE / 1024),
                ],
            ]);
    
            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }
    
            // Get authenticated user
            $user = Auth::guard('api')->user();
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized'
                ], 401);
            }
            
            // Get the uploaded file
            $audioFile = $request->file('audio_file');
            
            // Validate file type
            if (!in_array($audioFile->getMimeType(), self::ALLOWED_AUDIO_TYPES)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Invalid file type. Allowed types: MP3, WAV, OGG, M4A'
                ], 422);
            }
    
            DB::beginTransaction();
            
            try {
                // Use the original file name for upload
                $originalFileName = $audioFile->getClientOriginalName();
                $filename = preg_replace('/[^a-zA-Z0-9_\.\-]/', '_', $originalFileName);
                
                // Define the S3 path
                $s3Path = "uploads/{$user->id}/{$request->content_type}/{$filename}";
                
                // Upload file to S3
                $s3Upload = Storage::disk('s3')->putFileAs(
                    dirname($s3Path),
                    $audioFile,
                    basename($s3Path)
                );
    
                if (!$s3Upload) {
                    throw new \Exception('Failed to upload file to S3');
                }
    
                // Get the S3 URL
                $audioUrl = Storage::disk('s3')->url($s3Path);
    
                // Create user upload record
                $upload = UserUpload::create([
                    'user_id' => $user->id,
                    'content_type' => $request->content_type,
                    'content_id' => 0,
                    'title' => $request->title,
                    'description' => $request->description,
                    'genres' => $request->genres,
                    'audio_url' => $audioUrl,
                    'status' => 'active',
                    'file_path' => $s3Path,
                    'file_size' => $audioFile->getSize(),
                    'file_type' => $audioFile->getMimeType(),
                ]);
    
                DB::commit();
    
                return response()->json([
                    'success' => true,
                    'message' => 'Upload completed successfully',
                    'data' => [
                        'id' => $upload->id,
                        'title' => $upload->title,
                        'description' => $upload->description,
                        'genres' => $upload->genres,
                        'audio_url' => $upload->audio_url,
                        'created_at' => $upload->created_at,
                        'content_type' => $upload->content_type,
                        'user_id' => $upload->user_id,
                        'file_size' => $upload->file_size,
                        'file_type' => $upload->file_type
                    ]
                ]);
    
            } catch (\Exception $e) {
                DB::rollBack();
                
                // Cleanup the uploaded file on S3 in case of an error
                if (isset($s3Path) && Storage::disk('s3')->exists($s3Path)) {
                    Storage::disk('s3')->delete($s3Path);
                }
                
                throw $e;
            }
    
        } catch (\Exception $e) {
            \Log::error('Upload Error:', [
                'error' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return response()->json([
                'success' => false,
                'message' => 'Error uploading content',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}