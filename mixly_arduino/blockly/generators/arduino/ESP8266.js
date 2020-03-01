'use strict';

goog.provide('Blockly.Arduino.storage');

goog.require('Blockly.Arduino');

Blockly.Arduino.store_eeprom_write_long = function() {
	var address = Blockly.Arduino.valueToCode(this, 'ADDRESS', Blockly.Arduino.ORDER_ATOMIC) || '0';
	var data = Blockly.Arduino.valueToCode(this, 'DATA', Blockly.Arduino.ORDER_ATOMIC) || '0';
	Blockly.Arduino.definitions_['include_EEPROM'] = '#include <EEPROM.h>';
		Blockly.Arduino.setups_['setup_EEPROM.begin'] = 'EEPROM.begin(512);';
	var funcName='eepromWriteLong';
	var code2='void '+funcName+'(int address, unsigned long value) {\n' 
	+ '  union u_tag {\n'
	+ '  	byte b[4];\n'
	+ '  	unsigned long ULtime;\n'
	+ '  }\n'
	+ '  time;\n'
	+ '  time.ULtime=value;\n'
	+ '  EEPROM.write(address, time.b[0]);\n'
	+ '  EEPROM.write(address+1, time.b[1]);\n'
	+ '  if (time.b[2] != EEPROM.read(address+2) ) EEPROM.write(address+2, time.b[2]);\n'
	+ '  if (time.b[3] != EEPROM.read(address+3) ) EEPROM.write(address+3, time.b[3]);\n'
	+ '}\nEEPROM.commit();\n';
	Blockly.Arduino.definitions_[funcName] = code2;
	return 'eepromWriteLong('+address+', '+data+');\n';
}

Blockly.Arduino.store_eeprom_read_long = function() {
	var address = Blockly.Arduino.valueToCode(this, 'ADDRESS', Blockly.Arduino.ORDER_ATOMIC) || '0';
	Blockly.Arduino.definitions_['include_EEPROM'] = '#include <EEPROM.h>';
		Blockly.Arduino.setups_['setup_EEPROM.begin'] = 'EEPROM.begin(512);';
	var code ='eepromReadLong('+address+')';
	var funcName='eepromReadLong';
	var code2='unsigned long '+funcName+'(int address) {\n' 
	+ '  union u_tag {\n'
	+ '  	byte b[4];\n'
	+ '  	unsigned long ULtime;\n'
	+ '  }\n'
	+ '  time;\n'
	+ '  time.b[0] = EEPROM.read(address);\n'
	+ '  time.b[1] = EEPROM.read(address+1);\n'
	+ '  time.b[2] = EEPROM.read(address+2);\n'
	+ '  time.b[3] = EEPROM.read(address+3);\n'
	+ '  return time.ULtime;\n'
	+ '}\n';
	Blockly.Arduino.definitions_[funcName] = code2;
	return [code,Blockly.Arduino.ORDER_ATOMIC];
}

Blockly.Arduino.store_eeprom_write_byte = function() {
	var address = Blockly.Arduino.valueToCode(this, 'ADDRESS', Blockly.Arduino.ORDER_ATOMIC) || '0';
	var data = Blockly.Arduino.valueToCode(this, 'DATA', Blockly.Arduino.ORDER_ATOMIC) || '0';
	Blockly.Arduino.definitions_['include_EEPROM'] = '#include <EEPROM.h>';
	Blockly.Arduino.setups_['setup_EEPROM.begin'] = 'EEPROM.begin(512);';
	return 'EEPROM.write('+address+', '+data+');\nEEPROM.commit();\n';
}

Blockly.Arduino.store_eeprom_read_byte = function() {
	var address = Blockly.Arduino.valueToCode(this, 'ADDRESS', Blockly.Arduino.ORDER_ATOMIC) || '0';
	Blockly.Arduino.definitions_['include_EEPROM'] = '#include <EEPROM.h>';
	Blockly.Arduino.setups_['setup_EEPROM.begin'] = 'EEPROM.begin(512);';
	var code ='EEPROM.read('+address+')';
	return [code,Blockly.Arduino.ORDER_ATOMIC];
}