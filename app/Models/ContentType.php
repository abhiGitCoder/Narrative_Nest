<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ContentType extends Model
{
    protected $fillable = [
        'name'
    ];

    public function stories(): HasMany
    {
        return $this->hasMany(Stories::class);
    }

    public function podcasts(): HasMany
    {
        return $this->hasMany(Podcast::class);
    }
}
