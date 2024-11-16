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
        $stories = Stories::where('is_featured', true)
            ->select([
                'id',
                'title',
                'description',
                'author as creator',
                'cover_image',
                'read_time as duration',
                'published_date',
            ])
            ->orderByDesc('published_date')
            ->get()
            ->map(function ($item) {
                return array_merge($item->toArray(), ['content_type' => 'story']);
            });

        // Get featured podcasts
        $podcasts = Podcast::where('is_featured', true)
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
        $music = Music::where('is_featured', true)
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
        $stories = Stories::where('is_new_release', true)
            ->select([
                'id',
                'title',
                'description',
                'author as creator',
                'cover_image',
                'read_time as duration',
                'published_date',
            ])
            ->orderByDesc('published_date')
            ->get()
            ->map(function ($item) {
                return array_merge($item->toArray(), ['content_type' => 'story']);
            });

        // Get new release podcasts
        $podcasts = Podcast::where('is_new_release', true)
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
        $music = Music::where('is_new_release', true)
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
        
        // Initialize counters
        $storyIndex = 0;
        $podcastIndex = 0;
        $musicIndex = 0;
        
        // Fill the result array with alternating content types
        while (count($result) < $limit) {
            // Add story if available
            if ($storyIndex < count($storiesArray) && count($result) < $limit) {
                $result[] = $storiesArray[$storyIndex];
                $storyIndex++;
            }
            
            // Add podcast if available
            if ($podcastIndex < count($podcastsArray) && count($result) < $limit) {
                $result[] = $podcastsArray[$podcastIndex];
                $podcastIndex++;
            }
            
            // Add music if available
            if ($musicIndex < count($musicArray) && count($result) < $limit) {
                $result[] = $musicArray[$musicIndex];
                $musicIndex++;
            }
            
            // If we've run out of all content types but haven't reached the limit,
            // start over from the beginning of the remaining content
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
}