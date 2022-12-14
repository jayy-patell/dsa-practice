#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>

struct Node {
	int data;
	struct Node* next;
};

void push(struct Node** head, int d)
{
	struct Node* new_node= (struct Node*)malloc(sizeof(struct Node));

	new_node->data = d;
	new_node->next = (*head);
	(*head) = new_node;
}

bool search(struct Node* head, int data)
{
	struct Node* t = head;
	while (t != NULL) {
		if (t->data == data)
			return 1;
		t = t->next;
	}
	return 0;
}


struct Node* getUnion(struct Node* head1, struct Node* head2)
{
	struct Node* result = NULL;
	struct Node *t1 = head1, *t2 = head2;

	while (t1 != NULL) {
		push(&result, t1->data);
		t1 = t1->next;
	}

	while (t2 != NULL) {
		if (!search(result, t2->data))
			push(&result, t2->data);
		t2 = t2->next;
	}

	return result;
}


struct Node* getIntersection(struct Node* head1, struct Node* head2)
{
	struct Node* result = NULL;
	struct Node* t1 = head1;


	while (t1 != NULL) {
		if (search(head2, t1->data))
			push(&result, t1->data);
		t1 = t1->next;
	}

	return result;
}



void print(struct Node* node)
{
	while (node != NULL) {
		printf("%d ", node->data);
		node = node->next;
	}
}



/* Driver program to test above function*/
int main()
{
	/* Start with the empty list */
	struct Node* head1 = NULL;
	struct Node* head2 = NULL;
	struct Node* intersecn = NULL;
	struct Node* unin = NULL;

	/*create a linked lists 10->15->5->20 */
	push(&head1, 20);
	push(&head1, 4);
	push(&head1, 15);
	push(&head1, 10);

	/*create a linked lists 8->4->2->10 */
	push(&head2, 10);
	push(&head2, 2);
	push(&head2, 4);
	push(&head2, 8);

	intersecn = getIntersection(head1, head2);
	unin = getUnion(head1, head2);

	printf("\n First list is \n");
	print(head1);

	printf("\n Second list is \n");
	print(head2);

	printf("\n Intersection list is \n");
	print(intersecn);

	printf("\n Union list is \n");
	print(unin);

	return 0;
}
