<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CartBook extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'author',
        'genre_id',
        'amount',
        'user_id'
    ];

    public function genre(){
        return $this->belongsTo(Genre::class);
    }

    public function cart(){
        return $this->belongsTo(User::class);
    }
}
