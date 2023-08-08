export default function Search({ cards, setFilteredCards }) {
  const handleSearch = (searchText) => {
    const filtered = cards.filter(card =>
      card.title.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredCards(filtered);
  };
  const handleChange = (event) => {
    const searchText = event.target.value;
    handleSearch(searchText);
  };
  return (
    <div>
      <label htmlFor="search" className="pl-[-5rem] sm:w- flex items-center rounded-md border-5 border-solid border-gray-600 bg-[#1d1d1de4]">
      <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 37 37" fill="none" className="w-[1.8rem]">
<circle cx="16.9582" cy="16.9582" r="10.7917" stroke="white" stroke-width="2"/>
<path d="M30.8335 30.8335L26.2085 26.2085" stroke="white" stroke-width="2" stroke-linecap="round"/>
</svg>
  <input   onChange={handleChange} id="search" className=" w-[250px] rounded-md h-10 text-center gap-16  bg-[#1d1d1de4] sm: w-100% lg:text-center lg:self-start lg:w-[290px]" type="text" placeholder="Search Game" />
     
      </label>
    </div>
  );
}
