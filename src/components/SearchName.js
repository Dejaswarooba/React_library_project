import React, { useState, useEffect } from "react";
import DescriptionScreen from "./DescriptionScreen";
import data from "./items.js";

export function SearchName({ addToCollections }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [filteredData, setFilteredData] = useState([]);
  const [showDescription, setShowDescription] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      const filtered = data.filter((val) => {
        if (searchTerm === "") {
          return val;
        } else if (
          val.name?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
          val.author?.toLowerCase().includes(searchTerm?.toLowerCase())
        ) {
          return val;
        }
      });
      setFilteredData(filtered);
    };

    fetchData();
  }, [searchTerm]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handleDescription = (book) => {
    setSelectedBook(book);
    setShowDescription(true);
  };

  return (
    <>
      <div className="ListContainer">
        <div className="searchInput_Container">
          <input
            id="searchInput"
            type="text"
            placeholder="Search for Title/Author."
            onChange={(event) => {
              setSearchTerm(event.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <div className="List_container">
          {currentItems.map((book) => {
            return (
              <div className="List" key={book.id}>
                <div className="BookCard">
                  <img src={book.img} className="BookImg" alt="Book_img" />
                  <div className="BookDetails">
                    <h3 className="BookName">{book.name}</h3>
                    <h5 className="BookAuth">{book.author}</h5>
                    <button
                      className={book.button}
                      onClick={() => handleDescription(book)}
                    >
                      Description
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="Pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </button>
          <span>{currentPage}</span>
          <button
            disabled={indexOfLastItem >= filteredData.length}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>

      {showDescription && selectedBook && (
        <DescriptionScreen
          book={selectedBook}
          onClose={() => setShowDescription(false)}
        />
      )}
    </>
  );
}
