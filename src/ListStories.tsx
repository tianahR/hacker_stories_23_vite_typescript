// import styles from './App.module.css';
import styled from 'styled-components';
import './App.css';
// import { ReactComponent as Check } from './check-square-svgrepo-com.svg';
 import Check  from './check-square-svgrepo-com.svg'
import * as React from 'react';



const StyledItem = styled.li`
display: flex;
align-items: center;
padding-bottom: 5px;
`;

const StyledColumn = styled.span<{ width?: string, height?: string}>`
padding: 0 5px;
white-space: nowrap;
overflow: hidden;
white-space: nowrap;
text-overflow: ellipsis;
a {
color: inherit;
}
width: ${(props) => props.width}; 
`;



const StyledButton = styled.button`
background: transparent;
border: 1px solid #171212;
padding: 5px;
cursor: pointer;
transition: all 0.1s ease-in;
&:hover {
background: #171212;
color: #ffffff;
}
`;


const StyledButtonSmall = styled(StyledButton)`
padding: 5px;
`;


type Story = {
  objectID: string;
  url: string;
  title: string;
  author: string;
  num_comments: number;
  points: number;
  };


  type ItemProps = {
    item: Story;
    onRemoveItem: (item: Story) => void;
  };


   type Stories = Array<Story>;

  type ListProps = {
      list: Stories;
      onRemoveItem: (item: Story) => void;
  };
      


const ListStories = React.memo(
  ({ list, onRemoveItem }: ListProps) =>
   (
      <ul>
        {list.map((item) => (
          <Item
            key={item.objectID}
            item={item}
            onRemoveItem={onRemoveItem}
          />
        ))}
      </ul>
     )
);

const Item = ({ item, onRemoveItem }: ItemProps) => (
    // <li className="item">
    // <li className={styles.item}>
    <StyledItem>

        
        <StyledColumn width="40%">
            <a href={item.url}>{item.title}</a>
        </StyledColumn>
        
            
       
             
        <StyledColumn width="30%"> {item.author} </StyledColumn>
        
        <StyledColumn width="10%"> {item.num_comments}</StyledColumn>
        
        <StyledColumn width="10%">  {item.points}</StyledColumn>
        
        <StyledColumn width="10%"> 
       

            {/* <button type="button" onClick={() => onRemoveItem(item)} className="button button_small"> */}
            {/* <button type="button" onClick={() => onRemoveItem(item)} className={`${styles.button} ${styles.buttonSmall}`}> */}
            <StyledButtonSmall type="button" onClick={() => onRemoveItem(item)}>  
            {/* <Check height="18px" width="18px" />  */}
            {/* Check */}
            <img src={Check} height="18px" width="18px"/>
            </StyledButtonSmall>
            

        </StyledColumn>
        

    </StyledItem>
    
    
  );
  export default ListStories;
