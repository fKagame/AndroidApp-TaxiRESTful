package com.example.movies;

import android.os.Bundle;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

import com.example.movies.loader.JSONData;
import com.example.movies.model.Movie;
import com.squareup.picasso.Picasso;

public class MovDetails extends AppCompatActivity
{
    private TextView txtTitle;
    private TextView txtrDate;
    private TextView txtOverview;
    private TextView txtRating;
    private ImageView imgPoster;

    @Override
    protected void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.details);

        /*getSupportActionBar().setTitle("Home");
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);*/

        int id = (Integer)getIntent().getExtras().get("id");
        Movie movie = JSONData.movieList.get(id);
        txtTitle = findViewById(R.id.movie_title);
        txtrDate = findViewById(R.id.movie_release_date);
        txtOverview = findViewById(R.id.movie_overview) ;
        txtRating = findViewById(R.id.movie_rating) ;
        imgPoster = findViewById(R.id.movie_poster) ;

        txtTitle.setText(movie.getTitle());
        txtrDate.setText(movie.getReleased());
        txtOverview.setText(movie.getOverview());
        txtRating.setText(movie.getRating());

        Picasso.get().load(movie.getPosterURL())
                .error(R.drawable.image_placeholder)
                .placeholder(R.drawable.image_placeholder)
                .into(imgPoster);

    }

}
