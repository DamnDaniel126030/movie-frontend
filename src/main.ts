import { Movie } from "./Movie";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

async function listMovies(): Promise<void>{  
  const response = await fetch(`${backendUrl}/movies`);
  const data = await response.json();  
  renderMovies(data);
};

function renderMovies(movies : Movie[]): void{
  const app = document.getElementById("app") as HTMLDivElement;
  app.textContent = "";
  const movieTable = document.createElement("table");
  const movieThead = createMovieTableHead();
  const movieTbody = createMovieTableBody(movies);
  movieTable.appendChild(movieThead)
  movieTable.appendChild(movieTbody)
  app.appendChild(movieTable)
};

function createMovieTableHead(): HTMLTableSectionElement {
  const thead = document.createElement("thead");
  const tr = document.createElement("tr");
  const thId = document.createElement("th");
  const thTitle = document.createElement("th");
  const thCategory = document.createElement("th");
  const thDuration = document.createElement("th");
  thId.textContent = "#";
  thTitle.textContent = "Title";
  thCategory.textContent = "Genre";
  thDuration.textContent = "Duration (minute)";
  tr.append(thId, thTitle, thCategory, thDuration);
  thead.appendChild(tr);
  return thead;
};

function createMovieTableBody(movies: Movie[]): HTMLTableSectionElement {
  const tbody = document.createElement("tbody");
  for (let index = 0; index < movies.length; index++) {
    const movie = movies[index];
    const tr = document.createElement("tr");
    const tdId = document.createElement("td");
    const tdTitle = document.createElement("td");
    const tdCategory = document.createElement("td");
    const tdDuration = document.createElement("td");
    tdId.textContent = movie.id!.toString();
    tdTitle.textContent = movie.title;
    tdCategory.textContent = movie.category;
    tdDuration.textContent = movie.duration.toString();
    tr.append(tdId, tdTitle, tdCategory, tdDuration);
    tbody.appendChild(tr);
  }
  
  return tbody;
};

listMovies();

const movieForm = document.getElementById("movieForm") as HTMLFormElement;

movieForm.addEventListener("submit", event => {
  event.preventDefault();

  const titleInput = document.getElementById("title") as HTMLInputElement;
  const categoryInput = document.getElementById("category") as HTMLInputElement;
  const durationInput = document.getElementById("duration") as HTMLInputElement;
  
  const movie = {
    title: titleInput.value,
    category: categoryInput.value,
    duration: parseInt(durationInput.value)
  };

  createMovie(movie);
})

async function createMovie(movie : Movie){
  try {
    const response = await fetch(`${backendUrl}/movies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(movie)
    });
    if (response.ok){
      clearForm();
      listMovies();
    }
    else{
      const responseText = await response.text();
      alert(responseText);
    }
  } 
  catch (error) {
    alert(error)
  }
  
};

function clearForm() : void{
  const titleInput = document.getElementById("title") as HTMLInputElement;
  const categoryInput = document.getElementById("category") as HTMLInputElement;
  const durationInput = document.getElementById("duration") as HTMLInputElement;
  titleInput.value = "";
  categoryInput.value = "";
  durationInput.value = "";
}


