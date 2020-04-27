package com.example.movies;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;
import com.example.movies.model.Movie;
import com.squareup.picasso.Picasso;
import java.util.List;

public class MyListAdapter extends RecyclerView.Adapter<MyListAdapter.ViewHolder>
{
    private List<Movie> mMovieList;
    private Context mContext;
    private ItemClickListener mItemClickListener;

    public interface ItemClickListener
    {
        void onItemClick(int position);
    }

    public MyListAdapter(List<Movie> mMovieList, Context mContext, ItemClickListener mItemClickListener)
    {
        this.mMovieList = mMovieList;
        this.mContext = mContext;
        this.mItemClickListener = mItemClickListener;
    }

    class ViewHolder extends RecyclerView.ViewHolder implements View.OnClickListener
    {
        TextView mTextView;
        TextView mTextView2;
        TextView mTextView3;
        ImageView mImageView;


        public ViewHolder(@NonNull View itemView)
        {
            super(itemView);
            mTextView = itemView.findViewById(R.id.textView);
            mTextView2 = itemView.findViewById(R.id.textView2);
            mImageView = itemView.findViewById(R.id.imageView);
            mTextView3 = itemView.findViewById(R.id.textView3);
            mImageView.setOnClickListener(this);

        }

        @Override
        public void onClick(View v)
        {
            mItemClickListener.onItemClick(getAdapterPosition());
        }
    }

    @NonNull
    @Override
    public MyListAdapter.ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType)
    {
        LayoutInflater inflater = LayoutInflater.from(mContext);
        View itemView = inflater.inflate(R.layout.card_list_item, parent, false);
        ViewHolder viewHolder = new ViewHolder(itemView);
        return viewHolder;
    }

    @Override
    public void onBindViewHolder(@NonNull MyListAdapter.ViewHolder holder, int position)
    {
        Movie movie = mMovieList.get(position);
        holder.mTextView.setText(movie.getTitle());
        holder.mTextView2.setText("Rating: " + movie.getRating());
        holder.mTextView3.setText("Release date: " + movie.getReleased());
        Picasso.get().load(movie.getPosterURL())
                .error(R.drawable.image_placeholder)
                .placeholder(R.drawable.image_placeholder)
                .into(holder.mImageView);
    }

    @Override
    public int getItemCount()
    {
        return mMovieList.size();
    }
}
