<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use App\Models\Record;

// CRUD
class RecordController extends Controller
{
    public function index()
    {
        // Get all maps of the current user.
        $records = Record::where('user_id', auth()->id())->get();

        return response()->json([
            "status" => "success",
            "data" => ["records" => $records]
        ], 200);
    }

    public function store()
    {
        $record = new Record;
        $record->user_id = auth()->id();
        $record->brand = request('brand');
        $record->model = request('model');
        $record->services = request('services');
        $record->location = request('location');
        $record->date = request('date');
        $record->time = request('time');
        $record->price = request('price');
        $record->save();

        return response()->json([
            "status" => "success"
        ], 200);
    }
}
