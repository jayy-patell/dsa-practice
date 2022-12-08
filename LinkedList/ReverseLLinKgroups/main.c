#include<stdio.h>
#include<stdlib.h>

struct node{
    int data;
    struct node* next;
};

struct node* kreverse(struct node* head, int k){
    //base case
    if(head == NULL){
        return NULL;
    }

    //step-1:reverse first k-nodes
    struct node* curr = head;
    struct node* prev = NULL;
    struct node* next = NULL;
    int count = 0;

    while(curr!=NULL && count<k){
        next = curr->next;
        curr->next = prev;
        prev = curr;
        curr = next;
        count++;
    }

    //step-2:recursion dekh lega aage
    if(next!=NULL){
        (head)->next = kreverse(next,k);
    }

    //step-3:return head of reversed list
    return prev;
}

void insert_Node(struct node** head, int ele){
    struct node* ptr = (struct node*)malloc(sizeof(struct node));
    ptr->data = ele;
    ptr->next=NULL;
    if(*head == NULL){
        // ptr->next = NULL;
        *head = ptr;
    }else{
        ptr->next = *head;
        *head = ptr;
    }
}

void print(struct node *head){
    printf("Printing elements:");
    struct node *temp = head;
    while(temp->next != NULL){
        printf("%d-->", temp->data);
        temp = temp->next;
    }
    printf("%d", temp->data);
}

int main(){
    struct node* head = NULL;
    insert_Node(&head, 5);
    insert_Node(&head, 6);
    insert_Node(&head, 7);
    insert_Node(&head, 8);
    print(head);

    printf("\nAfter reversing: ");
    head = kreverse(head, 2);
    print(head);

    return 0;
}