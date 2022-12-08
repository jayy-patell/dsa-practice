#include<stdio.h>
#include<stdlib.h>

struct node{
    int data;
    node* next;
    node* prev;
};

//should have used findElement to insert in circ LL cause technically there is no head or tail.
void circInsert(struct node** tail, int d){
    struct node* temp = (struct node*)malloc(sizeof(struct node));
    temp->data = d;
    if(*tail == NULL){
        temp->next = temp;
        temp->prev = temp; 
        *tail = temp;
    }
    else{
        //non-empty list
        struct node* temp2 = (*tail)->next;
        (*tail)->next = temp;
        temp->next = temp2;
        temp->prev = *tail;
        temp2->prev = temp;
        *tail = temp;        
    }
}

void circDelete(struct node** tail, int ele){
    struct node* temp = *tail;
    if(temp == NULL){
        printf("List is empty.");
    }
    else{
        struct node* prev = *tail;
        struct node* curr = prev->next;

        while(temp->data != ele){
            prev=curr;
            curr = curr->next;
        }
        prev->next = curr->next;
        curr->next = NULL;
        delete(curr);
    }
    
}

void display(struct node* tail){
    struct node* head = tail->next;
    struct node* temp = head;

    if(tail == NULL){
        printf("List is empty."); return;
    }

    do{
        printf("%d ", head->data);
        head = head->next;
    }while(head!=temp);
    printf("\n");
}

int main(){
    int n,d;
    struct node* tail = NULL;
    printf("Enter number of nodes: ");
    scanf("%d", &n);
    for(int i=1;i<=n;i++){
        printf("Enter data%d: ", i);
        scanf("%d", &d);
        circInsert(&tail, d);
    }

    printf("%d\n", tail->next->data);

    display(tail);
    return 0;
}