#include <stdio.h>  
#include <string.h>  
   
int main()  
{     
    char string[] = "Hardships often prepare ordinary people for an extraordinary destiny";  
    char words[100][100], small[100], large[100];  
    int i = 0, j = 0, k, length;  
      
    for(k=0; string[k]!='\0'; k++){  
          
        if(string[k] != ' ' && string[k] != '\0'){  
            words[i][j++] = string[k];  
        }  
        else{  
            words[i][j] = '\0';   
            i++;  //next row
            j = 0;  
        }  
    }  
       
    length = i + 1;  
      
    strcpy(small, words[0]);  
    strcpy(large, words[0]);  
       
    for(k = 0; k < length; k++){  
            
        if(strlen(small) > strlen(words[k])){  
            strcpy(small, words[k]);  
        }    
        if(strlen(large) < strlen(words[k]))  
            strcpy(large, words[k]);  
    }  
      
    printf("Smallest word: %s\n", small);  
    printf("Largest word: %s", large);  
      
    return 0;  
}  