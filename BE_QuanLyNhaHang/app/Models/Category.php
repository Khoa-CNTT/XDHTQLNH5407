<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class category extends Model
{
    use HasFactory;
    protected $table = 'categories';

    protected $fillable = [
        'id_type',
        'name',
        'status',
    ];

    public function type()
    {
        return $this->belongsTo(Type::class, 'id_type');
    }

    public function categoryFoods()
    {
        return $this->hasMany(CategoryFood::class, 'id_category');
    }

    public function foods()
    {
        return $this->belongsToMany(Food::class, 'category_foods', 'id_category', 'id_food');
    }
}
