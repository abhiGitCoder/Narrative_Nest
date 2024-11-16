<?php

// File: app/Models/Genre.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Genre extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<string>
     */
    protected $fillable = [
        'name',
        'category'
    ];

    /**
     * Get the stories that belong to this genre.
     */
    public function stories(): HasMany
    {
        return $this->hasMany(Stories::class);
    }

    /**
     * Get the podcasts that belong to this genre.
     */
    public function podcasts(): HasMany
    {
        return $this->hasMany(Podcast::class);
    }
}