import React from "react";

function CheckboxButton({
  showDeleted,
  setShowDeleted,
  setCategoryOutputFilter,
  setPlaceholder,
}) {
  // const [showDeleted, setShowDeleted] = useState(false);

  const onOptionChange = () => {
    setShowDeleted(!showDeleted);
    setCategoryOutputFilter("all");
    setPlaceholder("all");
  };

  return (
    <div className="checkbox-element">
      <input
        className="checkbox"
        type="checkbox"
        name="deleted-jokes"
        value={showDeleted}
        checked={showDeleted}
        onChange={onOptionChange}
      />
      <span className="checkbox-description">Show deleted jokes</span>
    </div>
  );
}
export default CheckboxButton;
