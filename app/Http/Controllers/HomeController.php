<?php

namespace App\Http\Controllers;

use App\Models\Stories;
use App\Models\Podcast;
use App\Models\Music;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class HomeController extends Controller
{
    public function homeData(Request $request): JsonResponse
    {
        try {
            // Get featured content
            $featuredContent = $this->getFeaturedContent();

            // Get new releases
            $newReleases = $this->getNewReleases();

            return response()->json([
                'success' => true,
                'data' => [
                    'featured_content' => $featuredContent,
                    'new_releases' => $newReleases,
                ],
                'message' => 'Home data retrieved successfully',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error retrieving home data',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    private function getFeaturedContent(): array
    {
        // Get featured stories
        $stories = Stories::where('is_featured', 1)
            ->select([
                'id',
                'title',
                'description',
                'author as creator',
                'cover_image',
                'read_time as duration',
                'published_date',
                'audio_url',
                'genres', 
            ])
            ->orderByDesc('published_date')
            ->get()
            ->map(function ($item) {
                return array_merge($item->toArray(), ['content_type' => 'story']);
            });

        // Get featured podcasts
        $podcasts = Podcast::where('is_featured', 1)
            ->select([
                'id',
                'title',
                'description',
                'host as creator',
                'cover_image',
                'duration',
                'published_date',
                'audio_url',
            ])
            ->orderByDesc('published_date')
            ->get()
            ->map(function ($item) {
                return array_merge($item->toArray(), ['content_type' => 'podcast']);
            });

        // Get featured music
        $music = Music::where('is_featured', 1)
            ->select([
                'id',
                'title',
                'description',
                'artist as creator',
                'cover_image',
                'duration',
                'published_date',
                'audio_url',
            ])
            ->orderByDesc('published_date')
            ->get()
            ->map(function ($item) {
                return array_merge($item->toArray(), ['content_type' => 'music']);
            });

        // Organize content to alternate between types
        return $this->alternateContentTypes($stories, $podcasts, $music, 20);
    }

    private function getNewReleases(): array
    {
        // Get new release stories
        $stories = Stories::where('is_new_release', 1)
            ->select([
                'id',
                'title',
                'description',
                'author as creator',
                'cover_image',
                'read_time as duration',
                'published_date',
                'audio_url',
                'genres',
            ])
            ->orderByDesc('published_date')
            ->get()
            ->map(function ($item) {
                return array_merge($item->toArray(), ['content_type' => 'story']);
            });

        // Get new release podcasts
        $podcasts = Podcast::where('is_new_release', 1)
            ->select([
                'id',
                'title',
                'description',
                'host as creator',
                'cover_image',
                'duration',
                'published_date',
                'audio_url',
            ])
            ->orderByDesc('published_date')
            ->get()
            ->map(function ($item) {
                return array_merge($item->toArray(), ['content_type' => 'podcast']);
            });

        // Get new release music
        $music = Music::where('is_new_release', 1)
            ->select([
                'id',
                'title',
                'description',
                'artist as creator',
                'cover_image',
                'duration',
                'published_date',
                'audio_url',
            ])
            ->orderByDesc('published_date')
            ->get()
            ->map(function ($item) {
                return array_merge($item->toArray(), ['content_type' => 'music']);
            });

        // Organize content to alternate between types
        return $this->alternateContentTypes($stories, $podcasts, $music, 20);
    }

    private function alternateContentTypes($stories, $podcasts, $music, $limit): array
    {
        $result = [];
        $storiesArray = $stories->toArray();
        $podcastsArray = $podcasts->toArray();
        $musicArray = $music->toArray();
        
        $maxItems = ceil($limit / 3);
        
        $storyIndex = 0;
        $podcastIndex = 0;
        $musicIndex = 0;
        
        while (count($result) < $limit) {
            if ($storyIndex < count($storiesArray) && count($result) < $limit) {
                $result[] = $storiesArray[$storyIndex];
                $storyIndex++;
            }
            
            if ($podcastIndex < count($podcastsArray) && count($result) < $limit) {
                $result[] = $podcastsArray[$podcastIndex];
                $podcastIndex++;
            }
            
            if ($musicIndex < count($musicArray) && count($result) < $limit) {
                $result[] = $musicArray[$musicIndex];
                $musicIndex++;
            }
            
            if ($storyIndex >= count($storiesArray) && 
                $podcastIndex >= count($podcastsArray) && 
                $musicIndex >= count($musicArray) && 
                count($result) < $limit) {
                $storyIndex = 0;
                $podcastIndex = 0;
                $musicIndex = 0;
            }
        }
        
        return $result;
    }

    public function storyData(): JsonResponse
    {
        try {
            // Fetch all stories
            $stories = Stories::select([
                'id',
                'title',
                'description',
                'author as creator',
                'cover_image',
                'read_time as duration',
                'published_date',
                'audio_url',
                'genres',
            ])
            ->orderByDesc('published_date')
            ->get();

            return response()->json([
                'success' => true,
                'data' => $stories,
                'message' => 'All stories retrieved successfully',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error retrieving stories',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
public function musicData(): JsonResponse
{
    try {
        // Fetch all music
        $music = Music::select([
            'id',
            'title',
            'music_language',
            'description',
            'content_type',
            'artist as creator',
            'cover_image',
            'duration',
            'album',
            'genre',
            'audio_url',
            'published_date',
            'is_featured',
            'is_new_release'
        ])
        ->orderByDesc('published_date')
        ->get()
        ->map(function ($item) {
            // Format the data if needed
            return array_merge($item->toArray(), [
                'duration' => $this->formatDuration($item->duration),
                'published_date' => $item->published_date->format('Y-m-d H:i:s'),
            ]);
        });

        return response()->json([
            'success' => true,
            'data' => $music,
            'message' => 'All music retrieved successfully',
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Error retrieving music',
            'error' => $e->getMessage(),
        ], 500);
    }
}

// Helper function to format duration if needed
private function formatDuration($duration): string
{
    try {
        // Assuming duration is stored in seconds
        $minutes = floor($duration / 60);
        $seconds = $duration % 60;
        
        return sprintf("%02d:%02d", $minutes, $seconds);
    } catch (\Exception $e) {
        return $duration; // Return original value if formatting fails
    }
}
}