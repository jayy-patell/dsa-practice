// #include<stdio.h>
// #include<stdlib.h>

// struct Node{
//     int data;
//     struct Node *next;
// };

// void insert_Node(struct Node** head, int ele){
//     struct Node* ptr = (struct Node*)malloc(sizeof(struct Node));
//     ptr->data = ele;
//     ptr->next=NULL;
//     if(*head == NULL){
//         ptr->next = NULL;
//         *head = ptr;
//     }else{
//         ptr->next = *head;
//         *head = ptr;
//     }
// }

// void print(struct Node *temp){
//     printf("Printing elements:");
//     // struct Node *temp = head;
//     while(temp != NULL){
//         printf("%d-->", temp->data);
//         temp = temp->next;
//     }
// }

// int main(){
//     int n, ele;
//     printf("Enter the number of elements in list:");
//     scanf("%d",&n);
//     struct Node *head = (struct Node*)malloc(sizeof(struct Node));

//     for(int i=0; i<n; i++){
//         printf("Enter the element you want to create:");
//         scanf("%d",&ele);
//         insert_Node(&head,ele);
//     }

//     print(head);
    
//     return 0;
// }


//removing duplicates from unsorted list
#include<stdio.h>
#include<stdlib.h>

typedef struct Node {
	int data;
	struct Node* next;
} Node;

Node* newNode(int data)
{
	Node* temp = (Node*)malloc(sizeof(Node));
	temp->data = data;
	temp->next = NULL;
	return temp;
}

void removeDuplicates(Node* start)
{
	Node *ptr1, *ptr2, *dup;
	ptr1 = start;

	while (ptr1 != NULL) {
		ptr2 = ptr1;

		while (ptr2->next != NULL) {
			/* If duplicate then delete it */
			if (ptr1->data == ptr2->next->data) {
				/* sequence of steps is important here */
				dup = ptr2->next;
				ptr2->next = ptr2->next->next;
				free(dup);
			}
			else /* This is tricky */
				ptr2 = ptr2->next;
		}
		ptr1 = ptr1->next;
	}
}

void printList(struct Node* node)
{
	while (node != NULL) {
		printf("%d ", node->data);
		node = node->next;
	}
}

int main()
{
	/* The constructed linked list is:
	10->12->11->11->12->11->10*/
	struct Node* start = newNode(10);
	start->next = newNode(12);
	start->next->next = newNode(11);
	start->next->next->next = newNode(11);
	start->next->next->next->next = newNode(12);
	start->next->next->next->next->next = newNode(11);
	start->next->next->next->next->next->next = newNode(10);

	printf("Linked list before removing duplicates ");
	printList(start);

	removeDuplicates(start);

	printf("\nLinked list after removing duplicates ");
	printList(start);

	return 0;
}


//func to remove duplicates from sorted list
//
// void removeDuplicates(Node* head) 
// { 
//     Node* current = head; 
//     Node* next_next; 
//     if (current == NULL) 
//     return; 
//     /* Traverse the list till last node */
//     while (current->next != NULL){ 
//     	if (current->data == current->next->data) { 
//     	    /* The sequence of steps is important*/        
//      	next_next = current->next->next; 
//      	free(current->next); 
//     	    current->next = next_next; 
//     } 
//     	else{ /* This is tricky: only advance if no deletion */ 
//         current = current->next; 
//     } 
//     } 
// }
