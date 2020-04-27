package com.example.movies.model;

public class Movie
{
    private int id;
    private String title;
    private String posterURL;
    private String rating;
    private  String released;
    private String overview;

    public Movie(int id, String title, String posterURL, String rating)
    {
        this.id = id;
        this.title = title;
        this.posterURL = posterURL;
        this.rating = rating;
    }

    public Movie(int id, String title, String posterURL, String rating, String released)
    {
        this.id = id;
        this.title = title;
        this.posterURL = posterURL;
        this.rating = rating;
        this.released = released;
    }
    public Movie(int id, String title, String posterURL, String rating, String released, String overview)
    {
        this.id = id;
        this.title = title;
        this.posterURL = posterURL;
        this.rating = rating;
        this.released = released;
        this.overview = overview;
    }

    public String getOverview()
    {
        return overview;
    }
    public void setOverview(String overview)
    {
        this.overview = overview;
    }
    public String getReleased()
    {
    return released;
    }
    public void setReleased(String released)
    {
        this.released = released;
    }
    public int getId()
    {
        return id;
    }

    public void setId(int id)
    {
        this.id = id;
    }

    public String getTitle()
    {
        return title;
    }

    public void setTitle(String title)
    {
        this.title = title;
    }

    public String getPosterURL()
    {
        return posterURL;
    }

    public void setPosterURL(String posterURL)
    {
        this.posterURL = posterURL;
    }

    public String getRating()
    {
        return rating;
    }

    public void setRating(String rating)
    {
        this.rating = rating;
    }
}
