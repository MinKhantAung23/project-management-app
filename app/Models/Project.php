<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
        'name',
        'description',
        'status',
        'due_date',
        'image_path',
        'created_by',
        'updated_by',
    ];
    /** @use HasFactory<\Database\Factories\ProjectFactory> */
    use HasFactory;

    public function tasks()
    {
        return $this->hasMany(Task::class, 'project_id', 'id');
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by', 'id');
    }

    public function updatedBy()
    {
        return $this->belongsTo(User::class, 'updated_by', 'id');
    }
}
