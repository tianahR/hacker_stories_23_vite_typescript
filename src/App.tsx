// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App



import * as React from 'react';
// import Search from './Search';
// import InputWithLabel from './InputWithLabel';
import ListStories from './ListStories';
import SearchForm from './SearchForm';
import axios from 'axios';
//import styles from './App.module.css'; // CSS module - CSS in css 
//import './App.css';
import styled from 'styled-components'; // Styled Component - CSS IN JS 
// import { ReactComponent as Check } from './check-square-svgrepo-com.svg';


const StyledContainer = styled.div`
height: 100vw;
padding: 20px;
background: #83a4d4;
background: linear-gradient(to left, #b6fbff, #83a4d4);
color: #171212;
`;

const StyledHeadlinePrimary = styled.h1`
font-size: 48px;
font-weight: 300;
letter-spacing: 2px;
`;



const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query=';

type Story = {
  objectID: string;
  url: string;
  title: string;
  author: string;
  num_comments: number;
  points: number;
  };

type Stories = Array<Story>;


  


const useSemiPersistentState = (key :string , initialState:string): [string, (newValue: string) => void] => {
  
  const isMounted = React.useRef(false);
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialState
  );

  
    

  React.useEffect(() => {
    // localStorage.setItem(key, value);

    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      console.log('A');
      localStorage.setItem(key, value);
    }
  }, [value, key]);

  return [value, setValue];
};



type StoriesState = {
  data: Stories;
  isLoading: boolean;
  isError: boolean;
};

interface StoriesFetchInitAction {
  type: 'STORIES_FETCH_INIT';
}

interface StoriesFetchSuccessAction {
  type: 'STORIES_FETCH_SUCCESS';
  payload: Stories;
}

interface StoriesFetchFailureAction {
  type: 'STORIES_FETCH_FAILURE';
}

interface StoriesRemoveAction {
  type: 'REMOVE_STORY';
  payload: Story;
}

type StoriesAction =
  | StoriesFetchInitAction
  | StoriesFetchSuccessAction
  | StoriesFetchFailureAction
  | StoriesRemoveAction;

const storiesReducer = (
  state: StoriesState,
  action: StoriesAction
) => {
  switch (action.type) {
    case 'STORIES_FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case 'STORIES_FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case 'STORIES_FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case 'REMOVE_STORY':
      return {
        ...state,
        data: state.data.filter(
          (story) => action.payload.objectID !== story.objectID
        ),
      };
    default:
      throw new Error();
  }
};


// const getSumComments = (stories) => {
//   console.log('C');

//   return stories.data.reduce(
//     (result, value) => result + value.num_comments,
//     0
//   );
// };



const App = () => {


  const [searchTerm, setSearchTerm] = useSemiPersistentState(
    'search',
    'React'
  );


  const [url, setUrl] = React.useState(
    `${API_ENDPOINT}${searchTerm}`
    );


    const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>
      ) => {
      setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>
      ) => {
       setUrl(`${API_ENDPOINT}${searchTerm}`);
       event.preventDefault();
     };

    


const [stories, dispatchStories] = React.useReducer(
  storiesReducer,
  { data: [], isLoading: false, isError: false }
);


const handleFetchStories = React.useCallback(async () => {
   
    // if (!searchTerm) return;

    dispatchStories({ type: 'STORIES_FETCH_INIT' });

    try{
      const result = await axios.get(url);
    
    
      dispatchStories({
        type: 'STORIES_FETCH_SUCCESS',
        payload: result.data.hits,
        });

    }
    catch {
      dispatchStories({ type: 'STORIES_FETCH_FAILURE' });
    }

    
      
  }, [url]); 

React.useEffect(() => {
  handleFetchStories();
}, [handleFetchStories]);




  // remove items 
  const handleRemoveStory = React.useCallback((item:Story) => {
      dispatchStories({
      type: 'REMOVE_STORY',
      payload: item,
    });
  }, []);

  console.log('B:App');

  // const sumComments = React.useMemo(() => getSumComments(stories), [
  //   stories,
  // ]);


  return (

    <StyledContainer>

          <StyledHeadlinePrimary>My Hacker Stories.</StyledHeadlinePrimary>

                {/* <div className={styles.container}> */}
                {/* <h1 className="headline-primary">My Hacker Stories</h1> */}
                {/* <h1 className={styles.headlinePrimary}>My Hacker Stories</h1> */}

          <SearchForm
              searchTerm={searchTerm}
              onSearchInput={handleSearchInput}
              onSearchSubmit={handleSearchSubmit}
          />


          {/* <hr /> */}

          {stories.isError && <p>Something went wrong ...</p>}

          {stories.isLoading ? (
              <p>Loading ...</p>
          ) : (<ListStories 
                list={stories.data}
                onRemoveItem={handleRemoveStory}
              />
          )}
                {/* </div> */}


          

        
    </StyledContainer>
   
  );
};




export default App;

