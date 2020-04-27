package com.example.movies.loader;

import android.content.Context;
import android.util.Log;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.example.movies.model.Movie;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

public class JSONData
{
    public static List<Movie> movieList;
    private static String API_URL="https://api.themoviedb.org/3/movie/top_rated?api_key=";
    private static String API_KEY="6ecf2a78bd10dc8ade92a2a97047cc23";

    static
    {
        movieList = new ArrayList<>();
    }

    public static void getJSON(Context context)
    {
        String url = API_URL + API_KEY;

        // create Volley request queue
        RequestQueue queue = Volley.newRequestQueue(context);

        StringRequest stringRequest = new StringRequest(Request.Method.GET, url, new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                        parseJSON(response);
                    }
                }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                Log.e("ERROR", error.getMessage(), error);
            }
        });
        queue.add(stringRequest);
    }

    private static List<Movie> parseJSON(String response)
    {
        // Base url for the posters
        final String POSTER_BASE_URL = "https://image.tmdb.org/t/p/w185";

        if (response != null)
        {
            try
            {
                //create JSONObject
                JSONObject jsonObject = new JSONObject(response);

                //create JSONArray with the value from the characters key
                JSONArray resultsArray = jsonObject.getJSONArray("results");

                //loop through each object in the array
                for (int i =0; i < resultsArray.length(); i++)
                {
                    JSONObject charObject = resultsArray.getJSONObject(i);

                    //get values
                    int id = charObject.getInt("id");
                    String title = charObject.getString("title");
                    //save the fully qualified URL for the poster image
                    String posterURL = POSTER_BASE_URL + charObject.getString("poster_path");
                    String rating = String.valueOf(charObject.getDouble("vote_average"));
                    String released = charObject.getString("release_date");
                    String overv = charObject.getString("overview");

                    //create new Movie object
                    Movie movie = new Movie(id, title, posterURL, rating,released,overv);

                    //add movie object to our ArrayList
                    movieList.add(movie);
                }
            }
            catch (JSONException e)
            {
                e.printStackTrace();
            }
        }
        return sort(movieList);
    }

    private static List<Movie>  sort (List<Movie> movies)
    {
        Collections.sort(movies, new Comparator<Movie>() {
            @Override
            public int compare(Movie o1, Movie o2)
            {
                return o1.getTitle().compareTo(o2.getTitle()) ;
            }
        });
        return null;
    }
}
