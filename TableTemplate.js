'use strict';


class TableTemplate {

    constructor(template)
    {
        this.template = template;
    }
    static fillIn(id,dictionary,colName)
    {

        var table = document.getElementById(id)
        const entries = Object.entries(dictionary);
        //First looping through each row/tr
        for(var i = 0,row;row = table.rows[i];i++)
        {

            //then looping through the cells(dt) in each row
           for(var j = 0,col;col = row.cells[j];j++)
           {
               //Loop through cells and change text based on key/value dict
               for(const [key,value] of entries)
               {
                   const lookup =  `{{${key}}}`;
                   if(col.innerHTML === lookup && colName === undefined)
                   {
                       col.innerHTML = value;
                   }
                   else if(i === 0){
                       if(col.innerHTML === lookup){
                           col.innerHTML = value;
                           if(col.innerHTML === colName){
                              var colIndex = j
                           }
                       }
                   }
                   else if(col.innerHTML === lookup && j === colIndex)
                   {
                       col.innerHTML = value;
                   }
                   //Side Note: This should work in theory I have no idea how to use the ColName because there is no ID in the html
               }
           }
        }
        table.style.visibility = "visible";
    }
}




