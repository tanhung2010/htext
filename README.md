#README


## Features
### Text Utilities
* upper case : [hteXt] -> [HTEXT]
* lower case : [hteXt] -> [htext]
* invert case : [hteXt] -> [HTExT]
* proper case :  [hteXt] -> [Htext]

### line Utilities
* sort A-Z:
<pre> 
[abc]          [abc]
[efg]	->	   [efg]
[cde]		   [dec]
</pre>
 
* sort Z-A :
<pre> 
abc				 efg
efg		->		 cde
cde				 abc
</pre>

* Remove Dupplicate lines
<pre>
abc  	 		abc
abc   ->		efg
efg				cde
cde
efg
</pre>

* remove blank line
<pre>
abc				abc
[Blank]		->	efg
efg				cde
cde
</pre>

### Number 
<pre>
* Clean Hex : make array hex as format : <xx>   <yy> -> <xx> <yy>
* hex to ascii : [32 33 41 34] -> [23A4]
</pre>

### OBD Utilties
<pre>
* DTC : Hex to SAE
   12 34 12 35 2245 >> 
                      ---------------
                      P1234 
                      P1235
                      P2245
* DTC : SAE to Hex 
   P1234 P1236 P4567 >> 12 34 12 36 45 67

* Calculate check sum :
   + CS : get checksum 1 byte as ISO1941 , KWP2000
   + CS - CRC J1850 : get checksum crc of obd2 protocol PWM and VPW
   + CS - Invert : Get checksum invert 
   + CS - 2 Byte : Get checksum with format 2bytes
</pre>

## Requirements

If you have any requirements or dependencies, add a section describing those and how to install and configure them.

## Extension Settings

## Known Issues


## Release Notes

Users appreciate release notes as you update your extension.

### 1.0.0

Initial release of htext


### For more information
* [https://github.com/vinahitek/htext]

## Maintainers ##
 hungvo  - ***[tanhung2010@gmail.com]***

**Enjoy!**
