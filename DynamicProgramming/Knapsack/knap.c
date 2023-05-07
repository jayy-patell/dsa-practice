#include<stdio.h>
#include<stdlib.h>

int *subset;
int cost;
int l=0;

int max(int a, int b){
    return a>b ? a:b;
}

void KnapSack(int **KS, int n, int w, int *Value, int *Weight){
        int i, j, k;
        for(int i=0; i<=n; i++){    //n is the number of items
            for(int j=0; j<=w; j++){    //w is the capacity of knapsack
                KS[i][j] = 0;  // initialising all the values to zero..
            }
        }

         for(int i=1; i<=n; i++){
            for(int j=1; j<=w; j++){
                if(j-Weight[i] >= 0){
                    KS[i][j] = max(KS[i-1][j], Value[i]+KS[i-1][j-Weight[i]]);
                }else{
                    KS[i][j] = KS[i-1][j];
                }
            }
         }

         j=w;
         for(int i=n; i>0; i--){
            if(KS[i][j] != KS[i-1][j]){
                cost =+ Value[i];
                subset[l++] = i;
                j = j-Weight[i];
            }
         }

}


int main(){
    int n; // no.of items
    int w;  // capacity of knapsack
    printf("Enter the number of items:\n");
    scanf("%d", &n);
    printf("Enter the the capacity of knapsack:\n");
    scanf("%d",&w);

    int Value[n+1],Weight[n+1];
    Value[0] = Weight[0] = 0;      // we are initialising this as zero for further benefits..
    printf("Enter the weights:\n");
    for(int i=1; i<=n; i++){
        scanf("%d", &Weight[i]);
    }
    printf("Enter the Values:\n");
    for(int i=1; i<=n; i++){
        scanf("%d", &Value[i]);
    }

    int **KS = (int **)malloc((n+1) * sizeof(int *));
    for(int i=0; i<=n; i++){
        KS[i] = (int *)malloc((w+1) *sizeof(int));
    }

    subset = (int *)malloc((n+1)*sizeof(int));
    KnapSack(KS, n, w, Value, Weight); 

    printf("\nKnapSack Table is \n");
    for(int i=0;i<=n;i++)
    {
        for(int j=0;j<=w;j++)
        {
            printf("%d\t",KS[i][j]);
        }
        printf("\n");
    }

    return 0;
}