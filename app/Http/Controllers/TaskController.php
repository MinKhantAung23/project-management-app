<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\TaskResource;
use App\Http\Resources\UserResource;
use App\Models\Project;
use App\Models\User;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function myTask()
    {
        $user = auth()->user();
        $query  = Task::query()->where('assigned_user_id', $user->id);

        $sortFields = request('sort_field', 'created_at');
        $sortDirection = request('sort_direction', "desc");

        if (request('name')) {
            $query->where('name', "like", "%" . request("name") . "%");
        }

        if (request('status')) {
            $query->where('status', request("status"));
        }

        $tasks = $query
            ->orderBy($sortFields, $sortDirection)
            ->paginate(10)
            ->onEachSide(3);
        return inertia('Task/Index', [
            'tasks' => TaskResource::collection($tasks),
            'queryParams' => request()->query() ?: null,
        ]);
    }

    public function index()
    {
        $query  = Task::query();

        $sortFields = request('sort_field', 'created_at');
        $sortDirection = request('sort_direction', "desc");

        if (request('name')) {
            $query->where('name', "like", "%" . request("name") . "%");
        }

        if (request('status')) {
            $query->where('status', request("status"));
        }

        $tasks = $query
            ->orderBy($sortFields, $sortDirection)
            ->paginate(10)
            ->onEachSide(3);

        return inertia('Task/Index', [
            'tasks' => TaskResource::collection($tasks),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $projects = Project::orderBy('name', 'asc')->get();
        $users = User::orderBy('name', 'asc')->get();
        return inertia('Task/Create', [
            'projects' => ProjectResource::collection($projects),
            'users' => UserResource::collection($users),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    { {
            $data = $request->validated();
            $image = $data['image'] ?? null;
            if ($image) {
                $data["image_path"] = $image->store('task/' . Str::random(10), 'public');
            }
            $data['created_by'] = auth()->user()->id;
            $data['updated_by'] = auth()->user()->id;
            Task::create($data);
            return redirect()->route('task.index')->with('success', "Task \"{$data['name']}\" created successfully.");
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {

        $query  = $task->project();

        $sortFields = request('sort_field', 'created_at');
        $sortDirection = request('sort_direction', "desc");

        if (request('name')) {
            $query->where('name', "like", "%" . request("name") . "%");
        }

        if (request('status')) {
            $query->where('status', request("status"));
        }

        $tasks = $query
            ->orderBy($sortFields, $sortDirection)
            ->paginate(10)
            ->onEachSide(3);
        return inertia('Task/Show', [
            'task' => TaskResource::make($task),
            'tasks' => TaskResource::collection($tasks),
            'queryParams' => request()->query() ?: null,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        $projects = Project::orderBy('name', 'asc')->get();
        $users = User::orderBy('name', 'asc')->get();

        return inertia('Task/Edit', [
            'projects' => ProjectResource::collection($projects),
            'users' => UserResource::collection($users),
            'task' => TaskResource::make($task),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        $data = $request->validated();
        $image = $data['image'] ?? null;
        $data['updated_by'] = auth()->user()->id;
        $data['updated_by'] = auth()->user()->id;
        if ($image) {
            if ($task->image_path) {
                Storage::disk('public')->deleteDirectory(dirname($task->image_path));
            }
            $data["image_path"] = $image->store('task/' . Str::random(10), 'public');
        }
        $data['updated_by'] = auth()->user()->id;
        $task->update($data);
        return redirect()->route('task.index')->with('success', "Task \"{$task->name}\" updated successfully.");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        if ($task) {
            $task->delete();
            if ($task->image_path) {
                Storage::disk('public')->deleteDirectory(dirname($task->image_path));
            }
            return redirect()->route('task.index')->with('success', "Task \"{$task->name}\" deleted successfully.");
        }
    }
}
