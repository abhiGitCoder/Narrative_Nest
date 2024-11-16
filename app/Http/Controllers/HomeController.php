<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Stories;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class HomeController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Story::with(['contentType', 'genre']);

        // Apply filters
        if ($request->has('genre_id')) {
            $query->where('genre_id', $request->genre_id);
        }

        if ($request->has('is_featured')) {
            $query->where('is_featured', $request->boolean('is_featured'));
        }

        if ($request->has('is_new_release')) {
            $query->where('is_new_release', $request->boolean('is_new_release'));
        }
        // Apply sorting
        $sortField = $request->get('sort_by', 'published_date');
        $sortDirection = $request->get('sort_direction', 'desc');
        $allowedSortFields = ['published_date', 'title', 'author', 'read_time'];

        if (in_array($sortField, $allowedSortFields)) {
            $query->orderBy($sortField, $sortDirection);
        }

        // Get paginated results
        $perPage = $request->get('per_page', 10);
        $stories = $query->paginate($perPage);

        return response()->json([
            'success' => true,
            'data' => $stories,
            'message' => 'Stories retrieved successfully'
        ]);
    }

    public function show(Story $story): JsonResponse
    {
        $story->load(['contentType', 'genre']);

        return response()->json([
            'success' => true,
            'data' => $story,
            'message' => 'Story retrieved successfully'
        ]);
    }
}
