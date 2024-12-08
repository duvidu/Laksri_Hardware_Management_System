import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const HomeSelectedItem = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:8000/inventory/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product details");
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleFeedback = async () => {
    try {
      const response = await fetch("http://localhost:8000/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          itemId: id,
          feedback: feedback,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to save feedback");
      }
      alert("Feedback saved successfully!");
      setFeedback("");
    } catch (error) {
      console.error("Error saving feedback:", error);
      alert("Failed to save feedback. Please try again.");
    }
  };

  return (
    <div className="selectedProduct" style={{display:"inline"}}>
      {loading && <p>Loading...</p>}
      {!loading && !product && <p>No product found</p>}
      {!loading && product && (
        <div className="detailsBox">
          <p>Product Name : {product.name}</p>
          <p>Unit Price : {product.price}</p>
          <p>Available Amount : {product.quantity}</p>
        </div>
      )}

      <div>
        <label>Add your feedback about this product</label>
        <form>
          <textarea value={feedback} onChange={(e) => setFeedback(e.target.value)} rows="4"cols="80"></textarea>
        </form>
        <button type="button" onClick={handleFeedback}>
          Save
        </button>
      </div>

    </div>
  );
};

export default HomeSelectedItem;
