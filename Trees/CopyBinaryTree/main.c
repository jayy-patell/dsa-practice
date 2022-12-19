#include<stdio.h>
#include<stdlib.h>

struct node{
    int data;
    struct node* left;
    struct node* right; 
};

struct node* copy (struct node* root){
    struct node* temp;
    if(root != NULL){
        temp=(struct node*)malloc(sizeof(struct node));
        if(root->left != NULL){
            temp->left=copy(root->left);
        }
        if(root->right != NULL){
            temp->right=copy(root->right);
        }
        temp->data=root->data;
        return temp;
    }
    return NULL;
}

struct node* insert(struct node** root, int data){
    //allocating memory and initializing the newnode with data "data"..
    struct node* newnode = (struct node*)malloc(sizeof(struct node));
    newnode->data = data;
    newnode->left = NULL;
    newnode->right = NULL;

    if(*root == NULL ){
        *root = newnode;

    //agar data is smaller than root -- left sub tree.. 
    }else if((*root)->data > data){
        (*root)->left = insert(&((*root)->left), data);

    //agar data is bigger than root -- right sub tree..
    }else if((*root)->data < data){
        (*root)->right = insert(&((*root)->right), data);
    }

    return *root;
}
void takeInput(struct node** root){
    int data;
    while (data != -1){  // jab tak data -1 nhi hota it will take input..
        printf("Enter the data: ");
        scanf("%d",&data);
        if(data == -1){
            break;
        }else{
            insert(&(*root), data);
        }
    }
}
void Inorder(struct node* root){
    
    if((root) == NULL){
        return ;
    }
    Inorder(root->left);
    printf("%d \t", root->data);
    Inorder(root->right);
}


int main(){

    struct node* root = NULL;
    printf("Please enter the data into the BST\n");
    takeInput(&root);
    Inorder(root);

    struct node* root2 = NULL;
    root2 = copy(root);
    Inorder(root2);

    return 0;
}