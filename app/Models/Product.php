<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'category_id',
        'name',
        'slug',
        'description',
        'price',
        'stock',
        'image',
        'ingredients',
        'is_active',
        'featured'
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'is_active' => 'boolean',
        'featured' => 'boolean',
        'ingredients' => 'array',
        'stock' => 'integer',
    ];

    protected $appends = ['stock_quantity', 'category_name', 'image_url'];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function getStockQuantityAttribute()
    {
        return $this->stock;
    }

    public function getCategoryNameAttribute()
    {
        return $this->category ? $this->category->name : null;
    }

    public function getImageUrlAttribute()
    {
        return $this->image;
    }
}
