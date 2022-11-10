#include<stdio.h>
#include<stdlib.h>

struct Node{
    int data;
    struct Node *next;
};

void insert_Node(struct Node* head, int ele){
    struct Node* ptr = (struct Node*)malloc(sizeof(struct Node));
    ptr->data = ele;
    if(head == NULL){
        ptr->next = NULL;
        head = ptr;
    }else{
        ptr->next = head;
        head = ptr;
    }
}

void print(struct Node *head){
    printf("PRinting elements:");
    struct Node *temp = head;
    while(temp != NULL){
        printf("%d-->", temp->data);
        temp = temp->next;
    }
}

int main(){
    int n, ele;
    printf("Enter the number of elements in list:");
    scanf("%d",&n);
    struct Node *head = NULL;

    for(int i=0; i<n; i++){
        printf("Enter the element you want to create:");
        scanf("%d",&ele);
        insert_Node(head,ele);
    }

    print(head);
    
    return 0;
}