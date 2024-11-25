<?php

namespace App\Http\Controllers;

use App\Http\Resources\TaskResource;
use App\Models\Task;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        $myPendingTasks = Task::query()
            ->where('assigned_user_id', $user->id)
            ->where('status', 'pending')
            ->count();

        $pendingTasks = Task::query()
            ->where('status', 'pending')
            ->count();

        $myCompletedTasks = Task::query()
            ->where('assigned_user_id', $user->id)
            ->where('status', 'completed')
            ->count();

        $completedTasks = Task::query()
            ->where('status', 'completed')
            ->count();

        $myInProgressTasks = Task::query()
            ->where('assigned_user_id', $user->id)
            ->where('status', 'in_progress')
            ->count();

        $inProgressTasks = Task::query()
            ->where('status', 'in_progress')
            ->count();

        $activeTasks = Task::query()
            ->whereIn('status', ['pending', 'in_progress'])
            ->where('assigned_user_id', $user->id)
            ->limit(10)
            ->get();

        $activeTasks = TaskResource::collection($activeTasks);
        return inertia('Dashboard', compact(
            'myPendingTasks',
            'pendingTasks',
            'myCompletedTasks',
            'completedTasks',
            'myInProgressTasks',
            'inProgressTasks',
            'activeTasks'
        ));
    }
}
