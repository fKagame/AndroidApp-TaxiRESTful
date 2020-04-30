package com.example.movies;

import android.content.Context;
import android.os.Bundle;
import android.util.Log;
import android.widget.ImageView;
import android.widget.RatingBar;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.example.movies.loader.JSONData;
import com.example.movies.model.Movie;
import com.squareup.picasso.Picasso;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.List;

public class MovDetails extends AppCompatActivity
{
    private TextView txtTitle;
    private TextView txtrDate;
    private TextView txtOverview;
    private TextView txtRating;
    private ImageView imgPoster;
    private RatingBar ratingBar;
    private String sessionId;
    private int id ;
    private int rating;

      //private String sessionId="https://api.themoviedb.org/3/authentication/guest_session/new?api_key=6ecf2a78bd10dc8ade92a2a97047cc23";
    private static String BASE_URL = "https://api.themoviedb.org/3";
    private static String API_URL = BASE_URL+"/movie/top_rated?api_key=";
    private static String API_RATING = BASE_URL+"/movie/{id}/rating?api_key=";
    private static String API_KEY = "6ecf2a78bd10dc8ade92a2a97047cc23";


    @Override
    protected void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.details);

        Movie movie = JSONData.movieList.get(id);
        id = movie.getId();
        txtTitle = findViewById(R.id.movie_title);
        txtrDate = findViewById(R.id.movie_release_date);
        txtOverview = findViewById(R.id.movie_overview) ;
        txtRating = findViewById(R.id.movie_rating) ;
        imgPoster = findViewById(R.id.movie_poster) ;
        ratingBar = findViewById(R.id.ratingBar);

        txtTitle.setText(movie.getTitle());
        txtrDate.setText(movie.getReleased());
        txtOverview.setText(movie.getOverview());
        txtRating.setText(movie.getRating());

        Picasso.get().load(movie.getPosterURL())
                .error(R.drawable.image_placeholder)
                .placeholder(R.drawable.image_placeholder)
                .into(imgPoster);

        ratingBar.setOnRatingBarChangeListener(new RatingBar.OnRatingBarChangeListener() {
            @Override
            public void onRatingChanged(RatingBar ratingBar, float rat, boolean fromUser) {
                rating = (int) rat;
                String message;
                getSESSION();
            }
        });

    }

    public void postRateJSON() // The post request to rate
    {
        String url = API_RATING + API_KEY + sessionId;
        url = url.replace("{id}",id+"");

        // create Volley request queue
        RequestQueue queue = Volley.newRequestQueue(this);

        JSONObject value = new JSONObject();
        try {
            value.put("value", rating);
        } catch (JSONException e) {
            e.printStackTrace();
        }

        JsonObjectRequest stringRequest = new JsonObjectRequest(Request.Method.POST, url, value, new Response.Listener<JSONObject>() {
            @Override
            public void onResponse(JSONObject response) {
                Toast.makeText(MovDetails.this,"Thanks for the rating "+rating,Toast.LENGTH_SHORT).show();
                Log.e("OK", response.toString());
            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                Log.e("ERROR", error.getMessage(), error);
            }
        });
        queue.add(stringRequest);
    }

    private void getSESSION() //The request
    {
        String url =  BASE_URL + "/authentication/guest_session/new?api_key=" + API_KEY;

        // create Volley request queue
        RequestQueue queue = Volley.newRequestQueue(this);

        StringRequest stringRequest = new StringRequest(Request.Method.GET, url, new Response.Listener<String>() {
            @Override
            public void onResponse(String response) {
                parseSESSION(response);
            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                Log.e("ERROR", error.getMessage(), error);
            }
        });
        queue.add(stringRequest);
    }
    private String parseSESSION(String response) // Extract session Id
    {
        if (response != null)
        {
            try
            {
                //create JSONObject
                JSONObject jsonObject = new JSONObject(response);

                sessionId = "&guest_session_id="+jsonObject.getString("guest_session_id");
                postRateJSON();
            }
            catch (JSONException e)
            {
                e.printStackTrace();
            }
        }
        return sessionId;
    }
}
