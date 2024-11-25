<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\TaskResource;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query  = Project::query();

        $sortFields = request('sort_field', 'created_at');
        $sortDirection = request('sort_direction', "desc");

        if (request('name')) {
            $query->where('name', "like", "%" . request("name") . "%");
        }

        if (request('status')) {
            $query->where('status', request("status"));
        }

        $projects = $query
            ->orderBy($sortFields, $sortDirection)
            ->paginate(10)
            ->onEachSide(3);

        return inertia('Project/Index', [
            'projects' => ProjectResource::collection($projects),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Project/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request)
    {
        $data = $request->validated();
        $image = $data['image'] ?? null;
        if ($image) {
            $data["image_path"] = $image->store('project/' . Str::random(10), 'public');
        }
        $data['created_by'] = auth()->user()->id;
        $data['updated_by'] = auth()->user()->id;
        Project::create($data);
        return redirect()->route('project.index')->with('success', "Project \"{$data['name']}\" created successfully.");
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        $query  = $project->tasks();

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
        return inertia('Project/Show', [
            'project' => ProjectResource::make($project),
            'tasks' => TaskResource::collection($tasks),
            'queryParams' => request()->query() ?: null,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        return inertia('Project/Edit', [
            'project' => ProjectResource::make($project),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {
        $data = $request->validated();
        $image = $data['image'] ?? null;
        $data['updated_by'] = auth()->user()->id;
        $data['updated_by'] = auth()->user()->id;
        if ($image) {
            if ($project->image_path) {
                Storage::disk('public')->deleteDirectory(dirname($project->image_path));
            }
            $data["image_path"] = $image->store('project/' . Str::random(10), 'public');
        }
        $data['updated_by'] = auth()->user()->id;
        $project->update($data);
        return redirect()->route('project.index')->with('success', "Project \"{$project->name}\" updated successfully.");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        if ($project) {
            $project->delete();
            if ($project->image_path) {
                Storage::disk('public')->deleteDirectory(dirname($project->image_path));
            }
            return redirect()->route('project.index')->with('success', "Project \"{$project->name}\" deleted successfully.");
        }
    }
}
