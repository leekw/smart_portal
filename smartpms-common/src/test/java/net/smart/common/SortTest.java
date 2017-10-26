package net.smart.common;

public class SortTest {
	
	public static void insertSort(int[] arrays) {
		int min, i,j;
		for (i=1; i < arrays.length;i++) {
			min = arrays[i];
			for (j=i;j>0;j--) {
				if (arrays[j-1] > min) {
					arrays[j] = arrays[j-1];
				} else {
					break;
				}
			}
			arrays[j] = min;
		}
		for (int k= 0;k<arrays.length;k++) {
			System.out.println(arrays[k] + " ");
		}
	}
	
	public static void selectionSort(int[] array) {
		int min;
		int minIndex;
		int i, j;
		int comparisonCount = 0;
		int temp = 0;
		
		for (i = 0;i < array.length;i++) {
			for (j = i+1;j < array.length;j++) {
				if  (array[i] > array[j]) {
					temp = array[i];
					array[i] = array[j];
					array[j] = temp;
				}
			}
		}
		
		for (int k = 0; k < array.length; k++) {
			System.out.print(array[k] + " ");
		}

//		for (i = 0; i < array.length; i++) {
//			min = array[i];
//			minIndex = i;
//
//			for (j = i + 1; j < array.length; j++) {
//				comparisonCount++;
//				if (min > array[j]) {
//					min = array[j];
//					minIndex = j;
//				}
//
//			}
//			array[minIndex] = array[i];
//			array[i] = min;
//			System.out.println("cycle " + comparisonCount);
//			for (int k = 0; k < array.length; k++) {
//				System.out.print(array[k] + " ");
//			}
//		}

	}
	
	public static void bubbleSort(int[] array) {
		int i, j;
		int temp;
		int t;
		int comparisonCount = 0;
		
		for (i = array.length -1; i > 0;i--) {
			for (j=1;j<=i;j++) {
				if (array[j-1] > array[j]) {
					temp = array[j - 1];
					array[j - 1] = array[j];
					array[j] = temp;
				}
			}
		}
		
		for (int k = 0; k < array.length; k++) {
			System.out.print(array[k] + " ");
		}

//		for (int k = 0; k < array.length; k++) {
//			System.out.print(array[k] + " ");
//		}
//
//		for (i = array.length - 1; i > 0; i--) {
//			for (j = 1; j <= i; j++) {
//				comparisonCount++;
//				if (array[j - 1] > array[j]) {
//					temp = array[j - 1];
//					array[j - 1] = array[j];
//					array[j] = temp;
//				}
//			}
//			System.out.println("cycle " + comparisonCount);
//			for (int k = 0; k < array.length; k++) {
//				System.out.print(array[k] + " ");
//			}
//
//		}
	}
	
	public static void main(String[] args) throws Exception {
		
		int[] k = {5,4,2,7,1,3};
		
//		insertSort(k);
//		selectionSort(k);
		bubbleSort(k);
	}

}
