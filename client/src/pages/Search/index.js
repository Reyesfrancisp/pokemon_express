import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/search/${searchQuery}`);
  };

  return (
    <div className="flex-col md:flex">
      <h1 className="text-3xl text-center font-semibold mb-4">Search Page</h1>
      <div className="flex flex-col items-center">
        <input
          className="px-4 py-2  border border-gray-300"
          type="text"
          placeholder="Search Pokemon"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          className="px-4 py-2 mt-4 bg-blue-500 text-white hover:bg-blue-600"
          onClick={handleSearch}
        >
          Search
        </button>


        <div class="flex justify-center bg-white my-5">
  <div class="relative max-w-md bg-gray-200 rounded-lg overflow-hidden shadow-md">
    <div class="absolute z-0 top-2 left-10 w-full h-2/3 bg-gradient-to-r from-slate-600 to-white rotate-6"></div>
    <div class="absolute z-1 top-32 transform -translate-x-2 w-full h-2/3 bg-gradient-to-br from-teal-600 to-white rotate-6"></div>
    <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/778.png" alt="Pokemon from the search bar" class="w-3/4 h-auto mx-auto relative z-10" />
    <div class="p-4 relative z-10 bg-gray-200">
      <h2 class="text-xl font-semibold mb-2">Pokemon name</h2>
      <p class="text-gray-600">Info about the Pokemon goes here.</p>
    </div>
  </div>
</div>








      </div>
    </div>
  );
}

export default Search;
