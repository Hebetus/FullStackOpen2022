<h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <Button handleClick={vote} text="vote" id={anecdote.id} />
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form method="post" onSubmit={handleSubmit}>
        <div><input name="content" type="text"/></div>
        <button type="submit">create</button>
      </form>