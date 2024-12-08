import React, { useEffect, useState } from 'react';
import RatingPage from './RatingComponent';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import './order.css';


const AllItemsRatingPage = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      fetchItems();
    }, []);
  
    
  
    const fetchItems = async () => {
        try {
          const response = await fetch('http://localhost:8000/inventory');
          if (!response.ok) {
            throw new Error('Failed to fetch items');
          }
          const data = await response.json();
          const itemsWithId = data.map(item => ({ ...item, id: item._id }));
          setItems(itemsWithId);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching items:', error);
          setLoading(false);
        }
      };
      
    const columns = [
      { field: 'img_URL', headerName: 'Image', width: 100 , renderCell: (params) => <img src={`http://localhost:8000/images/${params.value}`} style={{display: 'flex', justifyContent: 'center',alignItems: 'center', width: '70px', height: '70px' }} alt="item" /> },
      { field: 'name', headerName: 'Name', width: 300 },
      { field: 'rating', headerName: 'Rating', width: 550,renderCell: (params) =><RatingPage productId={params.row._id} /> },
        
     
    //   
    ];
  
    return (
        <div style={{ height: 1200, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center',marginTop:'300px' }}>
          
          
            <div style={{ width: '80%' }}>
                <div>
                  <h1 className="Rating">Rating Details</h1>
                </div>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <DataGrid
                        rows={items}
                        columns={columns}
                        pageSize={5}
                        rowHeight={100}
                        components={{
                            Toolbar: GridToolbar,
                        }}
                    />
                )}
            </div>
        </div>
    );
  };
  
  export default AllItemsRatingPage;