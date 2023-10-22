import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList({ items }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");

  // get data from form
  const [newItems, setNewItems] = useState(items);

  function getDataForm(data) {
    setNewItems([...items, data]);
  }
  //********

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  function handleSearch(e) {
    console.log(e.target.value);
    setSearch(e.target.value);
  }

  const itemsToDisplay = newItems.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  const filteredItems = itemsToDisplay.map((item) => {
    let items;
    if (search.length === 0) {
      items = <Item key={item.id} name={item.name} category={item.category} />;
    } else if (item.name.includes(search)) {
      items = <Item key={item.id} name={item.name} category={item.category} />;
    }
    return items;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onItemFormSubmit={getDataForm} />
      <Filter
        onCategoryChange={handleCategoryChange}
        search={search}
        onSearchChange={handleSearch}
      />
      <ul className="Items">{filteredItems}</ul>
    </div>
  );
}

export default ShoppingList;
