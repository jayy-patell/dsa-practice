
#include<stdio.h>
#include<stdlib.h>

struct Node{
	float coeff;
	int exp;
	struct Node* link;
};

void print(struct Node* head){
	if(head == NULL){
		printf("List is empty!");
	}
	else{
		struct Node* temp = head;
		while(temp!=NULL){
			printf("%fx^%d", temp->coeff,temp->exp);
			temp = temp->link;
			if(temp!=NULL){
				printf(" + ");
			}else{
				printf("\n");
			}
		}
	}
}

struct Node* insert(struct Node* head, int co, int ex){
	struct Node* temp;
	struct Node* newP = (struct Node*) malloc(sizeof(struct Node));
	newP->coeff = co;
	newP->exp = ex;
	newP->link = NULL;

	if(head == NULL || ex > head->exp){
		newP->link = head;
		head = newP;
	}
	else{
		temp = head;
		while(temp->link != NULL && temp->link->exp > ex){
			temp = temp->link;
		}
		newP->link = newP;
		temp->link = newP;
	}
	return head;
}

void create(struct Node* head){
	int n;
	int i;
	float coeff;
	int exp;
	printf("Enter the number of terms: ");
	scanf("%d", &n);

	for(i=0;i<n;i++){
		printf("Enter the coeff of term %d: ", (i+1));
		scanf("%d", &coeff);
		
		printf("Enter the expoent of term %d: ", (i+1));
		scanf("%d", &exp);

		head = insert(head,coeff,exp);
	}
}



void polyAdd(struct Node* head1, struct Node*head2){
	struct Node* ptr1 = head1;
	struct Node* ptr2 = head2;
	struct Node* head3 = NULL;

	while(ptr1!=NULL &&	ptr2!=NULL){
		if(ptr1->exp == ptr2->exp){
			head3 = insert(head3,ptr1->coeff + ptr2->coeff, ptr1->exp);
			ptr1 = ptr1->link;
			ptr2 = ptr2->link;
		}
		else if(ptr1->exp > ptr2->exp){
			head3 = insert(head3,ptr1->coeff,ptr1->exp);
			ptr1 = ptr1->link;
		}
		else if(ptr2->exp > ptr1->exp){
			head3 = insert(head3,ptr2->coeff,ptr2->exp);
			ptr2 = ptr2->link;
		}
	}

	while (ptr1 != NULL)
	{
		head3 = insert(head3,ptr1->coeff,ptr1->exp);
		ptr1 = ptr1->link;
	}
	while (ptr2 != NULL)
	{
		head3 = insert(head3,ptr2->coeff,ptr2->exp);
		ptr2 = ptr2->link;
	}
	
	printf("Added Polynomial!");
	print(head3);
}

void polyMult(struct Node* head1, struct Node* head2){
	struct Node* ptr1 = head1;
	struct Node* ptr2 = head2;
	struct Node* head3 = NULL;

	if(head1 == NULL || head2 == NULL){
		printf("Zero polynomial.");
		return;
	}

	while(ptr1!=NULL){
		while(ptr2!=NULL){
			head3 = insert(head3, ptr1->coeff * ptr2->coeff, ptr1->exp + ptr2->exp);
			ptr2 = ptr2->link;
		}
		ptr1 = ptr1->link;
		ptr2 = head2;
	}
	print(head3);
}

int main(){
	struct Node *poly1 = NULL, *poly2 = NULL, *poly = NULL;

	// Create first list of 5x^2 + 4x^1 + 2x^0
	create(poly1);
	create(poly2);

	print(poly1);
}
