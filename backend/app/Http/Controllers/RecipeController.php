<?php

namespace App\Http\Controllers;

use App\Recipe;
use Illuminate\Http\Request;
use GuzzleHttp\Client as GuzzleHttpClient;
use GuzzleHttp\Promise;
use Psr\Http\Message\ResponseInterface;
use GuzzleHttp\Exception\RequestException;

class RecipeController extends Controller
{

    private $theMealDb;
    public function __construct() {
        $this->middleWare('auth:api');

        $this->theMealDb = new GuzzleHttpClient([
            'base_uri' => 'https://api.yummly.com/v1/api/',
            'headers' => [
                'Accept' => 'application/json',
                'Content-Type' => 'application/x-www-form-urlencoded',
                'Accept-Encoding' => 'gzip',
                'X-Yummly-App-Id' => env('YUMMLY_APP_ID'),
                'X-Yummly-App-Key' => env('YUMMLY_APP_KEY'),
            ],
        ]);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $promise = $this->theMealDb->requestAsync('GET', 'recipes?&q=pasta');
        $promise->then(
            function (ResponseInterface $response) {
                $data = json_decode($response->getBody()->getContents());
                // return $data;
                
                return response([
                    'status' => 'success',
                    'data' => $data,
                ], 200);
            },
            function (RequestException $exception) {
                return response([
                    'status' => 'error',
                    'error' => 'request.exception',
                    'message' => 'An error occured',

                ], 400);
            }
        );

        $promise->wait();
        // $recipe = Recipe::all();

        // return $recipe;
    }
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Recipe  $recipe
     * @return \Illuminate\Http\Response
     */
    public function show(Recipe $recipe)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Recipe  $recipe
     * @return \Illuminate\Http\Response
     */
    public function edit(Recipe $recipe)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Recipe  $recipe
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Recipe $recipe)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Recipe  $recipe
     * @return \Illuminate\Http\Response
     */
    public function destroy(Recipe $recipe)
    {
        //
    }
}
