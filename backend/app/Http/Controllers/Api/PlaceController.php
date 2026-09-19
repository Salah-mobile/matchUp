<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Place;
use Illuminate\Http\Request;

class PlaceController extends Controller
{
    public function index()
    {
        $places = Place::all();

        return response()->json([
            'data' => $places
        ]);
    }

    public function store(Request $request)
    {
        $validation = $request->validate([
            'name' => 'required|string',
            'price' => 'required|numeric',
            'adress' => 'required|string',
            'city' => 'required|string',
        ]);

        $place = Place::create($validation);

        return response()->json([
            'message' => 'Place created successfully',
            'place' => $place
        ], 201);
    }

    public function show(string $id)
    {
        $place = Place::findOrFail($id);

        return response()->json([
            'data' => $place
        ]);
    }

    public function update(Request $request, string $id)
    {
        $place = Place::findOrFail($id);

        $validation = $request->validate([
            'name' => 'string',
            'price' => 'numeric',
            'adress' => 'string',
            'city' => 'string',
        ]);

        $place->update($validation);

        return response()->json([
            'message' => 'Place updated successfully',
            'place' => $place
        ]);
    }

    public function destroy(string $id)
    {
        $place = Place::findOrFail($id);

        $place->delete();

        return response()->json([
            'message' => 'Place deleted successfully'
        ]);
    }
}
