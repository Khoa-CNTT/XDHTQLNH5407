<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;
    protected $table = 'category';

    protected $fillable = [
        'name',
        'status',
    ];

    public function types()
    {
        return $this->hasMany(Type::class, 'id_category');
    }

    public function foods()
    {
        return $this->hasMany(Food::class, 'id_category');
    }
}
