#include<stdio.h>

int partition(int number[25],int first,int last){
    int i, j, pivot, temp;
    pivot=first;
    i=first;
    j=last;

    //continue the process till i crosses j
    while(i<j){
        while(number[i]<=number[pivot]&&i<last)
        i++;
        while(number[j]>number[pivot]&&j>first)
        j--;
        if(i<j){
            temp=number[i];
            number[i]=number[j];
            number[j]=temp;
        }
    }
    temp=number[pivot];
    number[pivot]=number[j];
    number[j]=temp;

    return j;
}

void quicksort(int number[25],int first,int last){
    if(first<last){
        int loc=partition(number,first,last);   //this is your split point
        quicksort(number,first,loc-1);
        quicksort(number,loc+1,last);
    }
}

int main(){
   int i, count, number[25];
   printf("How many elements are u going to enter?: ");
   scanf("%d",&count);
   printf("Enter %d elements: ", count);
   for(i=0;i<count;i++)
   scanf("%d",&number[i]);
   quicksort(number,0,count-1);
   printf("Order of Sorted elements: ");
   for(i=0;i<count;i++)
   printf(" %d",number[i]);
   return 0;
}