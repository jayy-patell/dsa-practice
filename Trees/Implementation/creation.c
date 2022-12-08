#include<stdio.h>
#include<stdlib.h>

struct node{
    int data;
    struct node* left;
    struct node* right; 
};

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
void Preorder(struct node* root){

    if(root == NULL){
        return;
    }
    printf("%d ", root->data);
    Preorder(root->left);
    Preorder(root->right);
}
void Postorder(struct node* root){

    if(root == NULL){
        return NULL;
    }
    Postorder(root->left);
    Postorder(root->right);
    printf("%d ", root->data);
}

//try making it with bool
void search(struct node* root, int ele){
    
    if(root == NULL){
        return;
    }

    if((root)->data == ele){
        printf("Element is present..");
    }

    if(ele > (root)->data){  // agar ele is greater than data of root then it will definitely go to the right sub-tree..
        search(((root)->right), ele);  // recursive call
    }
    else if(ele < (root)->data){
        search(((root)->left), ele);
    }
}

int MinVal(struct node* root){
    //obviously minimum value in the tree would be the value of the left most node of tree or node..
    while(root->left != NULL){
        root = root->left;
    }

    return root->data;
}
int MaxVal(struct node* root){
    // maximum value will be the right most value of tree or node..
    while(root->right != NULL){
        root = root->right;
    }

    return root->data;
}

struct node* deleteNode(struct node** root, int num){

    if((*root) == NULL){  // base case
        return *root;
    }

    //root tak pohoch jao..
    if((*root)->data == num){  // base case

        //0 child..
        if((*root)->left == NULL && (*root)->right == NULL){
            free (*root);
            return NULL;
        }

        //1 chlid..
        if((*root)->left != NULL && (*root)->right == NULL){
            struct node *temp = (*root)->left;
            free (*root);
            return temp;
        }

        if((*root)->left == NULL && (*root)->right != NULL){
            struct node *temp = (*root)->right;
            free (*root);
            return temp;
        }


        //2 child..
        if((*root)->left != NULL && (*root)->right != NULL){
            struct node *temp = (MinVal((*root)->right));
            (*root)->data = temp->data;
            (*root)->right = deleteNode(&((*root)->right), temp->data);
            return *root;
        }
    }
    else if((*root)->data > num){
       (*root)->left = deleteNode(&((*root)->left), num);
       return *root;
    }else{
        (*root)->right = deleteNode(&((*root)->right), num);
        return *root;
    }
}



int main(){
    int ele, num;

    struct node* root = NULL;

    printf("Please enter the data into the BST\n");
    takeInput(&root);

    Inorder(root);


    printf("Enter the element you want to search in the given tree: ");
    scanf("%d", &ele);
    search(root, ele);

    printf("Minimum Value is: %d\n", MinVal(root));
    printf("Maximum Value is: %d\n", MaxVal(root));


    printf("Enter the value you want to delete: ");
    scanf("%d",&num);
    struct node* root1 = deleteNode(&root, num);
    Inorder(root1);
}