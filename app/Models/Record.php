<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class Record extends Model
{
    /**
     * Determines the need for time stamps.
     *
     * @var bool
     */
    public $timestamps = false;

    protected $fillable = [
        'user_id','name', 'description', 'tile', 'events'
    ];
}
