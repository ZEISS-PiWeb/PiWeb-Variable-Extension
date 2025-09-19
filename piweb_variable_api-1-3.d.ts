declare module "internal/buffer_reader" {
	export class BufferReader {
	    _data: Buffer;
	    _currentPosition: number;
	    constructor(stream: Buffer);
	    readBool(): boolean;
	    readByte(): number;
	    readUInt16(): number;
	    readInt16(): number;
	    readInt32(): number;
	    readUInt32(): number;
	    readDouble(): number;
	    readDate(): Date;
	    readGuid(): string;
	    readString(): string;
	    readBinary(): Buffer;
	    readTimeStamp(): Date;
	}
}


declare module "internal/buffer_writer" {
	export class BufferWriter {
	    private _data;
	    private _initialBufferSize;
	    private _currentPosition;
	    constructor(initialSize?: number);
	    writeBool(bool: boolean): void;
	    writeByte(byte: number): void;
	    writeUInt32(uint: number): void;
	    writeDate(date: Date): void;
	    writeDouble(double: number): void;
	    writeString(value: string): void;
	    writeSizedBinary(data: Buffer, length?: number): void;
	    writeRawBinary(data: Buffer, length?: number): void;
	    writeSizeAt(index: number): void;
	    getData(): Buffer;
	    getLength(): number;
	    private _reserve(count);
	}
}


declare module "internal/calculation_broker" {
	export function execOnCalculate(variableContext: any): Buffer | undefined;
}


declare module "internal/multimap" {
	/**
	 * @author Jordan Luyke <jordanluyke@gmail.com>
	 */
	export interface IMultiMap<K, V> {
	    clear(): void;
	    containsKey(key: K): boolean;
	    containsValue(value: V): boolean;
	    containsEntry(key: K, value: V): boolean;
	    delete(key: K, value?: V): boolean;
	    entries: MultiMapEntry<K, V>[];
	    get(key: K): Iterable<V>;
	    keys(): Iterable<K>;
	    values(): Iterable<V>;
	    put(key: K, value: V): MultiMapEntry<K, V>[];
	}
	export class MultiMap<K, V> implements IMultiMap<K, V> {
	    private _entries;
	    clear(): void;
	    containsKey(key: K): boolean;
	    containsValue(value: V): boolean;
	    containsEntry(key: K, value: V): boolean;
	    delete(key: K, value?: V): boolean;
	    readonly entries: MultiMapEntry<K, V>[];
	    get(key: K): Iterable<V>;
	    keys(): Iterable<K>;
	    values(): Iterable<V>;
	    put(key: K, value: V): MultiMapEntry<K, V>[];
	}
	export class MultiMapEntry<K, V> {
	    readonly key: K;
	    readonly value: V;
	    constructor(key: K, value: V);
	}
}


declare module "internal/regex_tools" {
	export function wildcardToRegex(wildcard: string): RegExp;
	export function escapeRegex(str: string): string;
}


declare module "internal/serializable" {
	import { BufferWriter } from 'internal/buffer_writer';
	export interface Serializable {
	    serialize(target: BufferWriter): void;
	}
}


declare module "internal/string_tools" {
	export function bytesToHex(bytes: Uint8Array): string;
	export function hexToBytes(hex: string): Buffer;
	export function bytesToGuid(bytes: Uint8Array): string;
	export function splitString(str: string, delims: string): string[];
}


declare module "internal/synchronization_scopes" {
	export function resetToleranceToken(): void;
	export function checkToleranceToken(token: any): boolean;
	export function getToleranceToken(): any;
}


declare module "piweb/environment" {
	export type LengthUnit = "mm" | "inch";
	export type AngleUnit = "degreeDecimal" | "degreeMinuteSecond" | "radian";
	/**
	 * If the extensions defined multiple variables in the `package.json` manifest file, this property can be used to find out which one the user picked.
	 */
	export const variableName: string;
	/**
	 * Base interface for region info.
	 */
	export interface RegionInfoDescription {
	    /**
	     * Gets the name or ISO 3166 two-letter country/region code.
	     */
	    readonly name: string;
	}
	/**
	 * Interface for region info.
	 */
	export interface IRegionInfo extends RegionInfoDescription {
	    /**
	     * Gets the two-letter code defined in ISO 3166 for the country/region.
	     */
	    readonly twoLetterISORegionName: string;
	    /**
	     * Gets the three-letter code defined in ISO 3166 for the country/region.
	     */
	    readonly threeLetterISORegionName: string;
	}
	/**
	 * Base interface for culture info.
	 */
	export interface CultureInfoDescription {
	    /**
	     * Gets the name of the culture in the format `languagecode2-country/regioncode2`.
	     */
	    readonly name: string;
	}
	/**
	 * Interface for culture info.
	 */
	export interface ICultureInfo extends CultureInfoDescription {
	    /**
	     * Gets the ISO 639-1 two-letter code for the language of the culture.
	     */
	    readonly twoLetterISOLanguageName: string;
	    /**
	     * Gets the ISO 639-2 three-letter code for the language of the culture.
	     */
	    readonly threeLetterISOLanguageName: string;
	}
	/**
	 * Interface for time zone info.
	 */
	export interface ITimeZoneInfo {
	    /**
	     * Gets the name of the timezone.
	     */
	    readonly name: string;
	    /**
	     * Gets the standard offset of the timezone in hours.
	     */
	    readonly baseUtcOffset: number;
	    /**
	     * Returns the offset of the timezone at the specified date in hours.
	     * @param date The date at which the offset should be calculated. This takes daylight saving time etc. into account.
	     */
	    getUtcOffset(time: Date): number;
	}
	/**
	 * Contains the identifiers of a specific culture. PiWeb can use these information to provide localization and correct formatting of numbers and dates.
	 */
	export class CultureInfo implements ICultureInfo {
	    /**
	     * Gets the culture in which the host application was started.
	     */
	    static readonly currentCulture: ICultureInfo;
	    /**
	     * Gets the invariant culture.
	     */
	    static readonly invariantCulture: ICultureInfo;
	    /**
	     * Gets the name of the culture in the format `languagecode2-country/regioncode2`.
	     */
	    readonly name: string;
	    /**
	     * Gets the ISO 639-1 two-letter code for the language of the culture.
	     */
	    readonly twoLetterISOLanguageName: string;
	    /**
	     * Gets the ISO 639-2 three-letter code for the language of the culture.
	     */
	    readonly threeLetterISOLanguageName: string;
	    /**
	     * Initializes a new instance of the [[CultureInfo]] class.
	     * @param name The name of the culture.
	     */
	    constructor(name: string);
	}
	/**
	 * Contains the identifiers of a specific country or region.
	 */
	export class RegionInfo implements IRegionInfo {
	    /**
	     * Gets the region in which the host application was started.
	     */
	    static readonly currentRegion: IRegionInfo;
	    /**
	     * Gets the name or ISO 3166 two-letter country/region code.
	     */
	    readonly name: string;
	    /**
	     * Gets the two-letter code defined in ISO 3166 for the country/region.
	     */
	    readonly twoLetterISORegionName: string;
	    /**
	     * Gets the three-letter code defined in ISO 3166 for the country/region.
	     */
	    readonly threeLetterISORegionName: string;
	    /**
	     * Initializes a new instance of the [[RegionInfo]] class.
	     * @param name The name of the region.
	     */
	    constructor(name: string);
	}
	/**
	 * Contains information about a specific timezone.
	 */
	export class TimeZoneInfo implements ITimeZoneInfo {
	    /**
	     * Gets the timezone in which the host application was started.
	     */
	    static readonly localTimeZone: ITimeZoneInfo;
	    /**
	     * Gets the name of the timezone.
	     */
	    readonly name: string;
	    /**
	     * Gets the standard offset of the timezone in hours.
	     */
	    readonly baseUtcOffset: number;
	    /**
	     * Initializes a new instance of the [[TimeZoneInfo]] class.
	     * @param name The name of the time zone.
	     */
	    constructor(name: string);
	    /**
	     * Returns the offset of the timezone at the specified date in hours.
	     * @param date The date at which the offset should be calculated. This takes daylight saving time etc. into account.
	     */
	    getUtcOffset(date: Date): any;
	}
	/**
	 * Gets the name of the hosting PiWeb client.
	 */
	export const clientString: string;
	/**
	 * Gets the version of the hosting PiWeb client.
	 */
	export const clientVersion: string;
	/**
	 * Gets the semantic version of the plot extension API that is used to host the plot.
	 */
	export const apiVersion: string;
	/**
	 * Returns prefered display unit of length. This can be configured in the settings menu of Piweb Designer and PiWeb Monitor.
	 */
	export function getLengthUnit(): LengthUnit;
	/**
	 * Returns prefered display unit of angles. This can be configured in the settings menu of Piweb Designer and PiWeb Monitor.
	 */
	export function getAngleUnit(): AngleUnit;
	/**
	 * Returns prefered number of decimal places of displayed values. This can be configured in the settings menu of Piweb Designer and PiWeb Monitor.
	 * Use this only as a fallback value in case no prefered number of decimal places is configured for the displayed characteristic by attribute K2022.
	 */
	export function getDecimalPlaces(): number;
	export type LimitUsageReference = "nominal" | "middleOfTolerance";
	export type LimitType = "tolerance" | "warning" | "control" | "scrap";
	export class LimitsConfiguration {
	    constructor(tolerance: LimitConfiguration, warning: LimitConfiguration, control: LimitConfiguration, scrap: LimitConfiguration, yellowLimitType: LimitType, redLimitType: LimitType, limitUsageReference: LimitUsageReference);
	    readonly toleranceLimitConfiguration: LimitConfiguration;
	    readonly warningLimitConfiguration: LimitConfiguration;
	    readonly controlLimitConfiguration: LimitConfiguration;
	    readonly scrapLimitConfiguration: LimitConfiguration;
	    readonly yellowLimitConfiguration: LimitConfiguration;
	    readonly redLimitConfiguration: LimitConfiguration;
	    readonly limitUsageReference: LimitUsageReference;
	    getLimitConfiguration(type: LimitType): LimitConfiguration;
	}
	export class LimitConfiguration {
	    constructor(type: LimitType, toleranceFactor: number | undefined, name: string, priority: number);
	    readonly type: LimitType;
	    readonly toleranceFactor: number | undefined;
	    readonly name: string;
	    readonly priority: number;
	}
	export function getLimitsConfiguration(): LimitsConfiguration;
}


declare module "piweb/events" {
	/**
	 * An enumeration of supported events
	 */
	export type PiWebEvents = "calculate";
	/**
	 * Call this function to specify a callback for a specific event.
	 * @param name The name of the event.
	 * @param callback The callback function.
	 */
	export function on(name: PiWebEvents, callback: Function): void;
	/**
	 * @private
	 */
	export function emit(name: PiWebEvents): any;
}


declare module "piweb/expressions" {
	/**
	 * The possible simple return types of an expression.
	 */
	export type SimpleExpressionData = string | number | Date | undefined;
	/**
	 * The possible array return types of an expression.
	 */
	export interface ExpressionDataArray extends Array<SimpleExpressionData | ExpressionDataArray> {
	}
	/**
	 * The cumulated possible return types of an expression.
	 */
	export type ExpressionDataType = SimpleExpressionData | ExpressionDataArray;
	/**
	 * Evaluates the specified expression and returns the result untyped.
	 */
	export function evaluate(expression: string): ExpressionDataType;
	/**
	 * Evaluates the specified expression and returns the result as `string` or `undefined`, in case the result can't be converted into a `string` representation.
	 * @param expression The expression to evaluate.
	 */
	export function evaluateAsString(expression: string): string | undefined;
	/**
	 * Evaluates the specified expression and returns the result as `number` or `undefined`, in case the result can't be converted into a `number` representation.
	 * @param expression The expression to evaluate.
	 */
	export function evaluateAsNumber(expression: string): number | undefined;
	/**
	 * Evaluates the specified expression and returns the result as `date` or `undefined`, in case the result can't be converted into a `date` representation.
	 * @param expression The expression to evaluate.
	 */
	export function evaluateAsDate(expression: string): Date | undefined;
	/**
	 * Evaluates the specified expression and returns the result as `array` or `undefined`, in case the result wasn't an `array` of any kind.
	 * @param expression The expression to evaluate.
	 */
	export function evaluateAsArray(expression: string): ExpressionDataArray | undefined;
}


declare module "piweb/format" {
	/**
	 * ## Introduction
	 *
	 * In many cases you'll want to create text output with numeric content, dates or time. On the other hand, you might want to parse numeric- or datetime values from files.
	 * To ensure the correct formatting, you can use the `piweb.format` module.
	 *
	 * ```TypeScript
	 * import * as piweb from 'piweb';
	 * import drawing = piweb.format;
	 * ```
	 *
	 * @module format
	 */ /**
	* @preferred
	*/ /** */
	import { CultureInfoDescription } from "piweb/environment";
	/**
	 * When parsing a date without a specified time zone, the `DateKind` parameter determines which time zone the date has.
	 *
	 * **`assumeLocal`**
	 *
	 * The represented time will be interpreted as local time.
	 *
	 * **`assumeUTC`**
	 *
	 * The represented time will be interpreted as UTC.
	 *
	 */
	export type DateKind = "assumeUtc" | "assumeLocal";
	/**
	 * Converts the specified value to its string representation using the specified format string and the culture specific format information.
	 * @param value The number to format.
	 * @param formatString The format string that tells how to format the number.
	 * Please refer to the [.Net number format specification](https://docs.microsoft.com/en-us/dotnet/standard/base-types/custom-numeric-format-strings)
	 * for a complete list of possible format strings.
	 * @param culture The culture to use for formatting. The function will use the invariant culture by default.
	 */
	export function formatNumber(value: number, formatString: string, culture?: CultureInfoDescription): string;
	/**
	 * Converts the specified string representation of a number in a specified culture specific format to its `number` equivalent. The function will
	 * return NaN in case parsing wasn't possible.
	 * @param str The string to parse.
	 * @param culture The culture to use for parsing. The function will use the invariant culture by default.
	 */
	export function parseNumber(str: string, culture?: CultureInfoDescription): number;
	/**
	 * Converts the specified date to its string representation using the specified format string and the culture specific format information.
	 * @param date The date to format.
	 * @param offsetHours The number of hours about which to offset the date.
	 * @param format The format string that tells how to format the date.
	 * Please refer to the [.Net date and time format specification](https://docs.microsoft.com/en-us/dotnet/standard/base-types/custom-date-and-time-format-strings)
	 * for a complete list of possible format strings.
	 * @param culture
	 */
	export function formatDate(date: Date, offsetHours?: number, format?: string, culture?: CultureInfoDescription): string;
	/**
	 * Converts the specified string to its `Date` equivalent by using culture specific format information and formatting style.
	 * @param str The string to parse
	 * @param culture The culture to use for parsing. The function will use the invariant culture by default.
	 * @param dateKind The date kind to use for parsing.
	 */
	export function parseDate(str: string, culture?: CultureInfoDescription, dateKind?: DateKind): Date;
	/**
	 * Converts the specified string to its `Date` equivalent by using culture specific format information and formatting style.
	 * @param str The string to parse
	 * @param format The format string that tells how to interpret the date.
	 * Please refer to the [.Net date and time format specification](https://docs.microsoft.com/en-us/dotnet/standard/base-types/custom-date-and-time-format-strings)
	 * for a complete list of possible format strings.
	 * @param culture The culture to use for parsing. The function will use the invariant culture by default.
	 * @param dateKind The date kind to use for parsing.
	 */
	export function parseDateExact(str: string, format?: string, culture?: CultureInfoDescription, dateKind?: DateKind): Date;
}


declare module "piweb" {
	/**
	 * ## Index
	 *
	 * ### Package definition
	 *
	 * For a complete description of the PiWeb custom-plot extension format, please refer to the [package](package.html) chapter.
	 *
	 * ### Modules
	 *
	 * The PiWeb plot extension API has a root module named `piweb` which encapsulates all child modules. The following child modules are available:
	 *
	 * | Module                  | Description                                |
	 * |-------------------------|--------------------------------------------|
	 * | [**`data`**](data.html) | Access the databinding of the variable |
	 * | [**`parameters`**](parameters.html) | Access the parameters of the variable|
	 * | [**`environment`**](environment.html) | Access settings of the PiWeb host application|
	 * | [**`events`**](events.html) | React to events emitted by the PiWeb host application|
	 * | [**`expressions`**](expressions.html) | Evaluate system variable expressions|
	 * | [**`format`**](format.html) | Read and write localized data|
	 * | [**`logger`**](logger.html) | Write entries into the piweb log|
	 * | [**`resources`**](resources.html) | Access resources that are located in the extension package |
	 * @module Index
	 */ /**
	* @preferred
	*/ /** */
	import * as data from "piweb/data";
	export { data };
	import * as logger from 'piweb/logger';
	export { logger };
	import * as resources from 'piweb/resources';
	export { resources };
	import * as events from 'piweb/events';
	export { events };
	import * as environment from "piweb/environment";
	export { environment };
	import * as format from "piweb/format";
	export { format };
	import * as expressions from "piweb/expressions";
	export { expressions };
	import * as parameters from "piweb/parameters";
	export { parameters };
}


declare module "piweb/logger" {
	/**
	 * Generates a log message with the `debug` log level.
	 * @param format The format string that shall be logged.
	 * @param param The parameters of the format string.
	 */
	export function debug(format: any, ...param: any[]): void;
	/**
	 * Generates a log message with the `info` log level.
	 * @param format The format string that shall be logged.
	 * @param param The parameters of the format string.
	 */
	export function info(format: any, ...param: any[]): void;
	/**
	 * Generates a log message with the `warning` log level.
	 * @param format The format string that shall be logged.
	 * @param param The parameters of the format string.
	 */
	export function warn(format: any, ...param: any[]): void;
	/**
	 * Generates a log message with the `error` log level.
	 * @param format The format string that shall be logged.
	 * @param param The parameters of the format string.
	 */
	export function error(format: any, ...param: any[]): void;
}


declare module "piweb/parameters" {
	import { ExpressionDataType, ExpressionDataArray } from 'piweb/expressions';
	/**
	 * Fetches the parameter with the specified id and returns the result untyped.
	 * @param id The parameter to fetch.
	 */
	export function getParameter(id: string): ExpressionDataType;
	/**
	 * Fetches the parameter with the specified id and returns the result as `string` or `undefined`, in case the result can't be converted into a `string` representation.
	 * @param id The parameter to fetch.
	 */
	export function getParameterAsString(id: string): string | undefined;
	/**
	 * Fetches the parameter with the specified id and returns the result as `number` or `undefined`, in case the result can't be converted into a `number` representation.
	 * @param id The parameter to fetch.
	 */
	export function getParameterAsNumber(id: string): number | undefined;
	/**
	 * Fetches the parameter with the specified id and returns the result as `date` or `undefined`, in case the result can't be converted into a `date` representation.
	 * @param id The parameter to fetch.
	 */
	export function getParameterAsDate(id: string): Date | undefined;
	/**
	 * Fetches the parameter with the specified id and returns the result as `array` or `undefined`, in case the result wasn't an `array` of any kind.
	 * @param id The parameter to fetch.
	 */
	export function getParameterAsArray(id: string): ExpressionDataArray | undefined;
}


declare module "piweb/data/attributes" {
	/**
	 * @module data
	 */ /** */
	import { BufferReader } from 'internal/buffer_reader';
	import { Iter } from 'iter';
	export type AttributeType = "string" | "integer" | "float" | "date" | "catalog";
	/**
	 * @private
	 */
	export const enum AttributeTypeId {
	    String = 0,
	    Integer = 1,
	    Float = 2,
	    Date = 3,
	    Catalog = 4,
	}
	/**
	 * @private
	 */
	export function mapAttributeType(attributeType: AttributeTypeId): AttributeType;
	export type AttributeValue = string | number | Date;
	/**
	 * An attribute stores additional information about an arbitrary entity. Entities with attributes are parts, characteristics, measurements,
	 * measured values and catalog entries. An attribute is identified by its key. To get information about the type and usage of an attribute,
	 * use the Key to get the AttributeDefinition from the [[Configuration]].
	 */
	export class Attribute {
	    constructor(key: number, type: AttributeType, value: AttributeValue);
	    /**
	     * An unsigned 16 bit integer that identifies the attributes definition.
	     */
	    key: number;
	    /**
	     * The datatype of the attributes value.
	     */
	    type: AttributeType;
	    /**
	     * The actual value of the attribute. Refer to the type to get the datatype.
	     */
	    value: AttributeValue;
	}
	/**
	 * An attribute item has a collection of attributes. The collection contains only attributes that actually have a value, so the number
	 * of attributes is usually lower than the number of attribute definitions that refer to the entity type of the attribute item.
	 */
	export interface IAttributeItem {
	    /**
	     * Gets a collection of attributes that are associated to this item.
	     * @see [[Attribute]]
	     */
	    readonly attributes: AttributeCollection;
	}
	/**
	 * Describes an accessible collection of attributes, that is attached to an item that implements [[IAttributeItem]]. The collection offers a wide range of helper
	 * functions to allow a type safe access to the attributes values. You can iterate over the collection with a for ... of loop.
	 */
	export class AttributeCollection {
	    readonly _attributes: Map<number, Attribute>;
	    constructor(attributes: Iterable<Attribute>);
	    /**
	     * Returns an iterator over all attributes.
	     */
	    [Symbol.iterator](): Iterator<Attribute>;
	    /**
	     * Returns an iter over all attributes.
	     */
	    iter(): Iter<Attribute>;
	    /**
	     * Gets the number of attributes stored in the collection.
	     */
	    readonly length: number;
	    /**
	     * Gets an iterator over the available keys in the collection.
	     */
	    readonly keys: Iter<number>;
	    /**
	     * Returns the attribute with the specified key, or `undefined` in case there is no attribute with this key.
	     * @param key The key of the attribute.
	     */
	    getAttribute(key: number): Attribute | undefined;
	    /**
	     * Returns the value of the attribute with the specified key, or `undefined` in case there is no attribute with this key.
	     * @param key The key of the attribute.
	     */
	    getValue(key: number): string | number | Date | undefined;
	    /**
	     * Returns the value of the attribute with the specified key as `string`, or `undefined` in case there is no attribute with this key.
	     * @param key The key of the attribute.
	     */
	    getStringValue(key: number): string | undefined;
	    /**
	     * Returns the value of the attribute with the specified key as integral `number`, or `undefined` in case there is no attribute with this key or the attributes value can't be converted into an integral `number` representation.
	     * @param key The key of the attribute.
	     */
	    getIntegerValue(key: number): number | undefined;
	    /**
	     * Returns the value of the attribute with the specified key as floating point `number`, or `undefined` in case there is no attribute with this key or the attributes value can't be converted into a floating point `number` representation.
	     * @param key The key of the attribute.
	     */
	    getFloatValue(key: number): number | undefined;
	    /**
	     * Returns the value of the attribute with the specified key as `Date`, or `undefined` in case there is no attribute with this key or the attributes value can't be converted into a `Date` representation.
	     * @param key The key of the attribute.
	     */
	    getDateValue(key: number): Date | undefined;
	    /**
	     * Returns the value of the attribute with the specified key as integral `number`, representing the key of a catalog entry, or `undefined` in case there is no attribute with this key or the attributes value can't be converted into an integral `number` representation.
	     * @param key The key of the attribute.
	     */
	    getCatalogIndex(key: number): number | undefined;
	    /**
	     * Returns the value of the attribute with the specified key as `number`, or `undefined` in case there is no attribute with this key or the attributes value can't be converted into a `number` representation.
	     * @param key The key of the attribute.
	     */
	    getNumericValue(key: number): number | undefined;
	}
	/**
	 * @private
	 */
	export function readAttributes(source: BufferReader): Attribute[];
}


declare module "piweb/data/configuration" {
	import { AttributeCollection, IAttributeItem, Attribute, AttributeType } from "piweb/data/attributes";
	import { InspectionPlanItem } from "piweb/data/inspection";
	import { MeasurementValue } from "piweb/data/measurements";
	import { Iter } from 'iter';
	/**
	 * Returns the database configuration from the PiWeb server.
	 */
	export function getConfiguration(): Configuration;
	/**
	 * [[include:configurationEntity.md]]
	 */
	export type ConfigurationEntity = "characteristic" | "part" | "measurement" | "measurementValue" | "catalog";
	/**
	 * Defines the datatype, entity and other parameters of an attribute with a specific K value.
	 */
	export class AttributeDefinition {
	    /**
	     * An unsigned short to identify the attribute.
	     */
	    key: number;
	    /**
	     * An unlocalized description text of the attribute.
	     */
	    description: string;
	    /**
	     * The datatype of the values of the attribute.
	     */
	    dataType: AttributeType;
	    /**
	     * The entity type this attribute belongs to.
	     */
	    entityType: ConfigurationEntity;
	    /**
	     * In case the `dataType` is `catalog`, this field contains the id of the [[Catalog]] that is used by this attribute.
	     * You can pass the id or the whole attribute definition into a [[CatalogCollection]] to get the [[Catalog]].
	     */
	    catalogId: string | undefined;
	    /**
	     *
	     * @param key An unsigned short to identify the attribute.
	     * @param description An unlocalized description text of the attribute.
	     * @param dataType The datatype of the values of the attribute.
	     * @param entityType The entity type this attribute belongs to.
	     * @param catalogId The id of the [[Catalog]] that is used by this attribute.
	     */
	    constructor(key: number, description: string, dataType: AttributeType, entityType: ConfigurationEntity, catalogId: string | undefined);
	}
	/**
	 * The configuration contains all attribute definitions for parts, characteristics, measurements, measured values and catalogs. Additionally, it contains the catalogs that are configured in the piweb database.
	 * @see [[AttributeDefinition]]
	 * @see [[Catalog]]
	 */
	export class Configuration {
	    /**
	     * The set of attribute definitions referring to inspection plan parts.
	     */
	    partAttributes: Map<number, AttributeDefinition>;
	    /**
	     * The set of attribute definitions referring to inspection plan characteristics.
	     */
	    characteristicAttributes: Map<number, AttributeDefinition>;
	    /**
	     * The set of attribute definitions referring to measurements.
	     */
	    measurementAttributes: Map<number, AttributeDefinition>;
	    /**
	     * The set of attribute definitions referring to measured values.
	     */
	    measurementValueAttributes: Map<number, AttributeDefinition>;
	    /**
	     * The set of attribute definitions referring to catalog entries.
	     */
	    catalogAttributes: Map<number, AttributeDefinition>;
	    /**
	     * A map of all attribute definitions.
	     */
	    allAttributes: Map<number, AttributeDefinition>;
	    /**
	     * The catalogs that are configured in the PiWeb database.
	     */
	    catalogs: CatalogCollection;
	    /**
	     * @private
	     */
	    constructor(definitions: Iterable<AttributeDefinition>, catalogs: Iterable<Catalog>);
	    /**
	     * Returns the catalog entry that is identified by they catalog entry key of the specified attribute.
	     * @param attribute The attribute with a catalog entry key as its value.
	     */
	    findCatalogEntry(attribute: Attribute): CatalogEntry | undefined;
	    /**
	     * Returns the catalog entry that is used by the specified measurement value.
	     *
	     * When using enumerated characteristics, every characteristic might use an individual catalog for its measurement value.
	     * The measurement value is then the key of a catalog entry of this catalog.
	     *
	     * @param characteristic The measured characteristic.
	     * @param measurementValue The measurement value.
	     */
	    findEnumeratedCatalogEntry(characteristic: InspectionPlanItem, measurementValue: MeasurementValue): CatalogEntry | undefined;
	    /**
	     * Returns the catalog that is associated to the specified attribute or enumerated characteristic.
	     * @param attribute A catalog attribute, or an enumerated characteristic.
	     */
	    findCatalog(attribute: Attribute | InspectionPlanItem): Catalog | undefined;
	    /**
	     * Returns the attribute definition that is associated to the specified attribute.
	     * @param attribute An attribute.
	     */
	    findDefinition(attribute: Attribute): AttributeDefinition | undefined;
	}
	/**
	 * A catalog collection contains a set of catalogs, that can be accessed with an [[AttributeDefinition]], an [[InspectionPlanItem]] or a catalog id.
	 * It's possible to iterate over the catalogs like the following:
	 * ```TypeScript
	 * for (let catalog of catalogs)
	 * {
	 * 		...
	 * }
	 * ```
	 */
	export class CatalogCollection {
	    private readonly _idMap;
	    /**
	     * @private
	     */
	    constructor(catalogs: Iterable<Catalog>);
	    [Symbol.iterator](): Iterator<Catalog>;
	    /**
	     * Returns an iter over all catalogs.
	     */
	    iter(): Iter<Catalog>;
	    /**
	     * Gets the total number of catalogs stored in the collection.
	     */
	    readonly length: number;
	    /**
	     * Returns the catalog that is associated to the specified catalog attribute definition, enumerated characteristic or catalog id.
	     * @param definition A catalog attribute definition, an enumerated characteristic or a catalog id.
	     */
	    find(definition: AttributeDefinition | InspectionPlanItem | string): Catalog | undefined;
	}
	/**
	 * Describes a list of enumerated values in the PiWeb database.
	 */
	export class Catalog {
	    /**
	     * Gets the id of the catalog. It can be used to access a certain catalog in the [[CatalogCollection]].
	     */
	    catalogId: string;
	    /**
	     * Gets an unlocalized name that is used only for displaying purposes.
	     */
	    name: string;
	    /**
	     * Gets the list of keys that refer to the attribute definitions that correspond to this catalog.
	     * @see [[AttributeDefinition]]
	     */
	    validAttributes: Iterable<number>;
	    /**
	     * Gets the set of catalog entries of which this catalog is composed.
	     */
	    entries: Map<number, CatalogEntry>;
	    /**
	     * @private
	     */
	    constructor(reference: string, name: string, validAttributes: Iterable<number>, entries: Iterable<CatalogEntry>);
	    /**
	     * @private
	     */
	    getCatalogGuid(): string;
	}
	/**
	 * Describes an enumerated value of a [[Catalog]].
	 */
	export class CatalogEntry implements IAttributeItem {
	    /**
	     * Gets a 16 bit integer that identifies the catalog entry.
	     */
	    readonly key: number;
	    /**
	     * Gets the catalog attributes, often referred to as the values of the catalogs columns.
	     */
	    readonly attributes: AttributeCollection;
	    /**
	     * @private
	     */
	    constructor(key: number, attributes: Iterable<Attribute>);
	    /**
	     * @private
	     */
	    toString(): string;
	    /**
	     * @private
	     */
	    getInspectionString(): string;
	}
}


declare module "piweb/data/defect" {
	import { MeasurementValue, Measurement } from "piweb/data/measurements";
	import { Iter } from 'iter';
	import { Vector, PlotTolerance, PlotPropertyCollection, ElementSystem } from 'piweb/data/plot';
	import { InspectionPlanItem } from 'piweb/data/inspection';
	/**
	 * Sets a value indicating whether this plot needs to fetch defects.
	 * @param value
	 * @deprecated Use the property `fetch_defects` in the [`package.json`](package.html#package-structure-extensions-fetch-defects) instead.
	 * @host
	 */
	export function setFetchDefects(value: boolean): void;
	/**
	 * Represents a single voxel of a defect.
	 */
	export class Voxel {
	    constructor(position: Vector, size: Vector);
	    /**
	     * The corner of the voxel that is closest to the origin.
	     */
	    position: Vector;
	    /**
	     * The size of the voxel in the reference system.
	     */
	    size: Vector;
	}
	/**
	 * Represents a defect
	 */
	export class Defect {
	    /**
	     * @private
	     */
	    constructor(plot: DefectPlot, index: number, position: Vector, size: Vector, tolerance: PlotTolerance | undefined, properties: PlotPropertyCollection, voxels: Iterable<Voxel>);
	    /**
	     * The plot to which this defect is attached. Can be used to obtain the reference system and global tolerances, etc..
	     */
	    plot: DefectPlot;
	    /**
	     * The index of the defect in the list of defects of the defect plot.
	     */
	    index: number;
	    /**
	     * The corner of the defects bounding box that is closest to the origin.
	     */
	    position: Vector;
	    /**
	     * The size of the defects bounding box.
	     */
	    size: Vector;
	    /**
	     * The tolerance for this defect. If it is `undefined`, there's still a tolerance property on the [[DefectPlot]].
	     */
	    tolerance: PlotTolerance | undefined;
	    /**
	     * The list of custom key value pairs of this defect.
	     */
	    properties: PlotPropertyCollection;
	    /**
	     * The voxels that define this defect.
	     */
	    voxels: Iter<Voxel>;
	}
	/**
	 * A container of defects that is the result or part of the result of a single evaluation run or scan.
	 */
	export class DefectPlot {
	    constructor(measurementId: string, characteristicId: string, transformation: ElementSystem, referenceSize: Vector, referenceVoxelSize: Vector, actualSize: Vector, actualVoxelSize: Vector, tolerance: PlotTolerance | undefined, properties: PlotPropertyCollection, defects: Iterable<Defect>);
	    /**
	     * @private
	     */
	    measurementId: string;
	    /**
	     * @private
	     */
	    characteristicId: string;
	    /**
	     * The transformation from of the voxel coordinates.
	     * @version 1.1
	     */
	    transformation: ElementSystem;
	    /**
	     * The reference size in voxel units.
	     */
	    referenceSize: Vector;
	    /**
	     * The size of a single voxel in voxel units. Most likely 1.
	     */
	    referenceVoxelSize: Vector;
	    /**
	     * The reference size in real-world units, e.g. mm.
	     */
	    actualSize: Vector;
	    /**
	     * The voxel size in real-world units, e.g. mm.
	     */
	    actualVoxelSize: Vector;
	    /**
	     * Global tolerance for all defects in this plot.
	     */
	    tolerance: PlotTolerance | undefined;
	    /**
	     * The list of custom key value pairs of this plot.
	     */
	    properties: PlotPropertyCollection;
	    /**
	     * The defects that are listed in this plot.
	     */
	    defects: Iter<Defect>;
	}
	/**
	 * Acts as an accessibility layer for a range of defect plots.
	 */
	export class DefectCollection implements Iterable<Defect> {
	    /**
	     * @private
	     */
	    private readonly _measurementIdMap;
	    /**
	     * @private
	     */
	    private readonly _measurementValueIdMap;
	    /**
	     * @private
	     */
	    private readonly _characteristicIdMap;
	    /**
	     * @private
	     */
	    private readonly _plots;
	    /**
	     * @private
	     */
	    private readonly _defects;
	    /**
	     * @private
	     */
	    constructor(plots: ReadonlyArray<DefectPlot>);
	    /**
	     * @private
	     */
	    [Symbol.iterator](): Iterator<Defect>;
	    /**
	     * Returns an iter over all defects.
	     */
	    iter(): Iter<Defect>;
	    /**
	     * Gets the total number of defects stored in the collection.
	     */
	    readonly length: number;
	    /**
	     * Returns an iterator over all plots stored in the collection.
	     */
	    getPlots(): Iter<DefectPlot>;
	    /**
	     * Returns the defect plots that are associated with the specified entity. The following associations are assumed:
	     *
	     * | Entity                            | Association |
	     * |----------------------------------|------------------------------------------------------|
	     * | [[Measurement]] | The measurement of the measurement value to which the plot is attached |
	     * | [[MeasurementValue]] | The measurement value to which the plot is attached |
	     * | [[InspectionPlanItem]] | The characteristic of the value to which the plot is attached |
	     * @param entity A measurement, measurement value or inspection plan item.
	     */
	    findPlotsByEntity(entity: Measurement | MeasurementValue | InspectionPlanItem): Iter<DefectPlot>;
	    /**
	     * Returns the defects that associated with the specified entity. The following associations are assumed:
	     *
	     * | Entity                            | Association |
	     * |----------------------------------|------------------------------------------------------|
	     * | [[Measurement]] | The measurement of the measurement value to which the defects are attached |
	     * | [[MeasurementValue]] | The measurement value to which the defects are attached |
	     * | [[InspectionPlanItem]] | The characteristic of the value to which the defects are attached |
	     * @param entity A measurement, measurement value or inspection plan item.
	     */
	    findDefectsByEntity(entity: Measurement | MeasurementValue | InspectionPlanItem): Iter<Defect>;
	    /**
	     * @private
	     */
	    first(): Defect | undefined;
	}
	/**
	 * Returns all defect plots that are bound to the plot extension element with databinding. You can change the databinding in PiWeb Designer.
	 * The defects are grouped by the measurement value they are associated to. Such a group or bundle is called [[DefectPlot]]. You can iterate
	 * either the defects or the plots by calling the [[getPlots]] method of the collection.
	 */
	export function getDefectCollection(): DefectCollection;
}


declare module "piweb/data" {
	/**
	 * @module data
	 * @preferred
	 *
	 * ## Introduction
	 *
	 * The `piweb.data` interface exposes methods to retrieve the inspection plan items, measurements, values and raw data that is bound to the variable extension.
	 *
	 * ```TypeScript
	 * import * as piweb from 'piweb';
	 * import data = piweb.data;
	 *
	 * piweb.events.on("calculate", calculate);
	 *
	 * function calculate() {
	 *     const configuration = data.getConfiguration();
	 *     const inspectionPlan = data.getInspectionPlan();
	 *     ...
	 * }
	 * ```
	 */ /** */
	/**
	* @private
	*/
	export { IAttributeItem, Attribute, AttributeType, AttributeValue } from "piweb/data/attributes";
	/**
	 * @private
	 */
	export { getRawDataCollection, RawDataEntity, RawDataCollection, RawDataItem, getRawDataSources, setRawDataSources } from "piweb/data/raw_data";
	/**
	 * @private
	 */
	export { getInspectionPlanCollection, InspectionPlanCollection, InspectionPlanItem, InspectionPlanItemType, Limit, LimitCollection, LimitContext } from "piweb/data/inspection";
	/**
	 * @private
	 */
	export { getMeasurementCollection, getGroupedMeasurementCollection, MeasurementCollection, Measurement, MeasurementGroup, MeasurementValue, MeasurementGroupingType, MeasurementGroupingTimeSpan } from "piweb/data/measurements";
	/**
	 * @private
	 */
	export { getConfiguration, Configuration, AttributeDefinition, ConfigurationEntity, CatalogCollection, Catalog, CatalogEntry } from "piweb/data/configuration";
	/**
	 * @private
	 */
	export { PlotProperty, PlotPropertyType, PlotPropertyCollection, PlotTolerance, LinearPlotTolerance, RadialPlotTolerance, RectangularPlotTolerance, SpatialPlotTolerance, PlotToleranceType, Vector } from "piweb/data/plot";
	/**
	 * @private
	 */
	export { getDefectCollection, Defect, DefectPlot, DefectCollection, Voxel, setFetchDefects } from "piweb/data/defect";
	/**
	 * @private
	 */
	export { getVolumeCollection, Volume, setVolumeSources, getVolumeSources, VolumeDirection, VolumeVector, VolumeCollection } from "piweb/data/volume";
	/**
	 * @private
	 */
	export { WellKnownKeys } from "piweb/data/wellknown_keys";
	import * as path from "piweb/data/path";
	/**
	 * @private
	 */
	export { path };
}


declare module "piweb/data/inspection" {
	import { AttributeCollection, Attribute, IAttributeItem } from "piweb/data/attributes";
	import { Measurement, MeasurementValue } from 'piweb/data/measurements';
	import { RawDataItem } from 'piweb/data/raw_data';
	import { LimitType, LimitUsageReference } from 'piweb/environment';
	import { Iter } from 'iter';
	/**
	 * [[include:inspectionPlanItemType.md]]
	 */
	export type InspectionPlanItemType = "characteristic" | "part";
	/**
	 * Describes a part or a characteristic of the inspection plan.
	 */
	export class InspectionPlanItem implements IAttributeItem {
	    /**
	     * @private
	     */
	    readonly inspectionPlanItemId: string;
	    /**
	     * @private
	     */
	    readonly parentId?: string;
	    /**
	     * Gets the attributes of this inspection plan item.
	     */
	    readonly attributes: AttributeCollection;
	    /**
	     * The item type, which is either `part` or `characteristic`.
	     */
	    readonly type: InspectionPlanItemType;
	    /**
	     * The path of the item in the inspection plan structure.
	     */
	    readonly path: string;
	    /**
	     * Gets the number of characteristic elements in the path.
	     */
	    readonly characteristicDepth: number;
	    /**
	     * Gets the number of part elements in the path.
	     */
	    readonly partDepth: number;
	    /**
	     * Gets a value indicating whether the characteristic is an enumerated characteristic, which means that its measurement value represents the key of a catalog entry.
	     */
	    readonly isEnumerated: boolean;
	    /**
	     * Gets a value indicating whether the characteristic is a counting characteristic, which means that its measurement value represents a number of arbitrary entities.
	     */
	    readonly isCounted: boolean;
	    /**
	     * @private
	     */
	    readonly catalogId?: string;
	    /**
	     * Gets the name of the item, which is also the last part of the path.
	     */
	    readonly name: string;
	    /**
	     * Gets the tolerances as well as other limits of this item.
	     */
	    readonly limits: LimitCollection;
	    /**
	     * @private
	     */
	    constructor(id: string, parentId: string | undefined, type: InspectionPlanItemType, isEnumerated: boolean, catalogId: string | undefined, isCounted: boolean, path: string, partDepth: number, characteristicDepth: number, attributes: Iterable<Attribute>);
	    /**
	     * @private
	     */
	    getCatalogGuid(): string | undefined;
	    /**
	     * @private
	     */
	    getInspectionPlanGuid(): string;
	}
	/**
	 * Describes a set of inspection plan items. It offers a wide range of functions to improve its accessibility. You can iterate over the collection like the following:
	 *
	 * ```TypeScript
	 * const inspectionPlanCollection = piweb.data.getInspectionPlanCollection();
	 * for (let item of inspectionPlanCollection)
	 * {
	 *     ...
	 * }
	 * ```
	 */
	export class InspectionPlanCollection implements Iterable<InspectionPlanItem> {
	    /**
	     * @private
	     */
	    private readonly _idMap;
	    /**
	     * @private
	     */
	    private readonly _pathMap;
	    /**
	     * @private
	     */
	    constructor(items: Iterable<InspectionPlanItem>);
	    /**
	     * @private
	     */
	    [Symbol.iterator](): Iterator<InspectionPlanItem>;
	    /**
	     * Returns an iter over all inspection plan items.
	     */
	    iter(): Iter<InspectionPlanItem>;
	    /**
	     * Gets the total number of items stored in the collection.
	     */
	    readonly length: number;
	    /**
	     * Returns an iterator over all characteristics stored in the collection.
	     */
	    getCharacteristics(): Iter<InspectionPlanItem>;
	    /**
	     * Returns an iterator over all parts stored in the collection.
	     */
	    getParts(): Iter<InspectionPlanItem>;
	    /**
	     * Returns the inspection plan item that associated to the the specified entity or `undefined` if the collection contains no such inspection plan item. The following associations are assumed:
	     *
	     * | Entity                            | Association |
	     * |----------------------------------|------------------------------------------------------|
	     * | [[Measurement]] | The part to which the measurement is attached |
	     * | [[MeasurementValue]] | The characteristic to which the measurement value is attached |
	     * | [[RawDataItem]] | The part or characteristic to which the raw data is attached |
	     * @param entity A measurement, measurement value or raw data item.
	     */
	    findByEntity(entity: Measurement | MeasurementValue | RawDataItem): InspectionPlanItem | undefined;
	    /**
	     *
	     * Returns the inspection plan item that is identified by the specified path or `undefined` if the collection contains no such inspection plan item.
	     * @param path An inspection plan path.
	     */
	    findByPath(path: string): InspectionPlanItem | undefined;
	    /**
	     * Returns the parent item of the specified inspection plan item or `undefined` if the item has no parent, or the collection doesn't contain it.
	     * @param item The item whose parent is requested.
	     */
	    findParent(item: InspectionPlanItem): InspectionPlanItem | undefined;
	    /**
	     * Returns the parent part of the specified inspection plan item or `undefined` if the item has no parent, or the collection doesn't contain it.
	     * @param item The item whose parent part is requested.
	     */
	    findParentPart(item: InspectionPlanItem): InspectionPlanItem | undefined;
	    /**
	     * Returns the child items of the specified inspection plan item or. Please be aware that only those children are returned, that are included in the binding of the element.
	     * @param item The item whose children are requested.
	     */
	    findChildren(item: InspectionPlanItem): Iter<InspectionPlanItem>;
	    /**
	     * @private
	     */
	    first(): InspectionPlanItem | undefined;
	}
	/**
	 * Returns all inspection plan items that are bound to the plot extension element with databinding. You can change the databinding in PiWeb Designer.
	 */
	export function getInspectionPlanCollection(requestedAttributes?: Array<number> | undefined): InspectionPlanCollection;
	/**
	 * Describes a set of limits that is applicable to a characteristic. You can retrieve it by accessing the
	 * property [[InspectionPlanItem.limits|limits]] on an [[InspectionPlanItem]].
	 */
	export class LimitCollection {
	    /**
	     * The tolerance limits, usually defined by attributes K2111 and K2112.
	     */
	    readonly tolerance: LimitContext;
	    /**
	     * The warning limits, usually defined by attributes K8014 and K8015.
	     */
	    readonly warning: LimitContext;
	    /**
	     * The control limits, usually defined by attributes K8012 and K8013.
	     */
	    readonly control: LimitContext;
	    /**
	     * The scrap limits, usually defined by attributes K2114 and K2115.
	     */
	    readonly scrap: LimitContext;
	    /**
	     * @private
	     */
	    constructor(tolerance: LimitContext, warning: LimitContext, control: LimitContext, scrap: LimitContext);
	    /**
	     * Returns the [[LimitContext]] with the specified limit type.
	     * @param type
	     */
	    getLimit(type: LimitType): LimitContext;
	}
	/**
	 * A wrapper around a [[Limit]] object with additional functions to determines status and limit usage.
	 */
	export class LimitContext {
	    private readonly _limitReference;
	    private readonly _limit;
	    /**
	     * The nominal value, usually determined by attribute K2110.
	     */
	    readonly nominalValue: number | undefined;
	    /**
	     * Determines whether the upper boundary of a limit is natural.
	     */
	    readonly upperValueIsNatural: boolean;
	    /**
	     * Determines whether the lower boundary of a limit is natural.
	     */
	    readonly lowerValueIsNatural: boolean;
	    /**
	     * Gets the lower limit.
	     */
	    readonly lowerValue: number | undefined;
	    /**
	     * Gets the upper limit.
	     */
	    readonly upperValue: number | undefined;
	    /**
	     * @private
	     */
	    constructor(nominalValue: number | undefined, limit: Limit, lowerValueIsNatural: boolean, upperValueIsNatural: boolean, limitReference: LimitUsageReference);
	    /**
	     * Returns true if the interval contains the specified value.
	     * @param value The value to be checked.
	     * @param precision The epsilon for floating point comparison, e.g. 0.00001.
	     */
	    contains(value: MeasurementValue | number | undefined, precision?: number): boolean;
	    /**
	     * Calculates the normalized limit usage for a given limit.
	     * @param value The value to be checked.
	     * @param precision The epsilon for floating point comparison, e.g. 0.00001.
	     */
	    getlimitUsage(value: MeasurementValue | number, precision?: number): number | undefined;
	    /**
	     * Returns a string in the format [lower; upper].
	     */
	    toDisplayString(): string;
	}
	/**
	 * Represents a limit, e.g. tolerance or warning limit.
	 */
	export class Limit {
	    readonly lower: number | undefined;
	    readonly upper: number | undefined;
	    readonly mid: number | undefined;
	    constructor(lower: number | undefined, upper: number | undefined);
	    /**
	     * Returns true if the interval contains the specified value.
	     * @param value The value to be checked.
	     * @param precision The epsilon for floating point comparison, e.g. 0.00001.
	     */
	    containsValue(value: number, precision: number): boolean;
	    /**
	     * Returns true if the interval is unbounded, which means there is neither an upper boundary nor a lower boundary defined.
	     */
	    isUnbounded(): boolean;
	}
}


declare module "piweb/data/measurements" {
	import { AttributeCollection, Attribute, IAttributeItem } from "piweb/data/attributes";
	import { InspectionPlanItem } from 'piweb/data/inspection';
	import { RawDataItem } from 'piweb/data/raw_data';
	import { Iter } from 'iter';
	/**
	 * Describes, how measurements are grouped.
	 */
	export type MeasurementGroupingType = "none" | "order" | "attribute" | "primaryMeasurementKey";
	/**
	 * Describes, how measurements are grouped.
	 */
	export type MeasurementGroupingTimeSpan = "minutes" | "hours" | "days" | "weeks" | "months" | "years" | "dayOfWeek";
	/**
	 * A collection of [`Measurements`](#measurement). It offers a wide range of functions to improve its accessibility. You can iterate over the collection like the following:
	 *
	 * ```TypeScript
	 * const measurementCollection = piweb.data.getMeasurementCollection();
	 * for (let measurement of measurementCollection)
	 * {
	 *     ...
	 * }
	 * ```
	 */
	export class MeasurementCollection {
	    private readonly _idMap;
	    /**
	     * @private
	     */
	    constructor(measurements: Iterable<Measurement>);
	    /**
	     * @private
	     */
	    [Symbol.iterator](): Iterator<Measurement>;
	    /**
	     * Returns an iter over all measurements.
	     */
	    iter(): Iter<Measurement>;
	    /**
	     * Gets the number of measurements in the collection.
	     */
	    readonly length: number;
	    /**
	     * Returns the measurement that associated to the the specified raw data item or `undefined` if the collection contains no such measurement.
	     * @param entity The raw data item from which the measurement should be returned.
	     */
	    findMeasurementByEntity(entity: RawDataItem): Measurement | undefined;
	    /**
	     * Returns the measurements that are associated to the the specified inspection plan part or `undefined` if the collection contains no such measurement.
	     * @param entity The inspection plan part to search measurements for.
	     */
	    findMeasurementsByEntity(entity: InspectionPlanItem): Iter<Measurement>;
	    /**
	     * Returns the measurement value that is associated to the specified [`RawDataItem`](#rawdataitem) or `undefined` if the collection contains no such measurement value.
	     * @param entity The raw data item from which the measurement value should be returned.
	     */
	    findValueByEntity(entity: RawDataItem): MeasurementValue | undefined;
	    /**
	     * Returns the measurement values that are associated to the the specified inspection plan characteristic or `undefined` if the collection contains no such measurement.
	     * @param entity The inspection plan characteristic to search values for.
	     */
	    findValuesByEntity(entity: InspectionPlanItem): Iter<MeasurementValue>;
	    /**
	     * @private
	     */
	    first(): Measurement | undefined;
	}
	/**
	 * A collection of [`measurement groups`](#measurementgroup). The groups can be defined in PiWeb Monitor. Each group is a [`measurement collection`](#measurementcollection) with a specific key:
	 *
	 * ```TypeScript
	 * const measurementGroups = piweb.data.getMeasurementGroupCollection();
	 * for (let measurementGroup of measurementGroupCollection)
	 * {
	 *     for (let measurement of measurementGroup)
	 *     {
	 *         ...
	 * 	   }
	 * }
	 * ```
	 */
	export class MeasurementGroupCollection {
	    private readonly _groups;
	    /**
	     * Describes, how the measurements are grouped.
	     */
	    readonly groupingType: MeasurementGroupingType;
	    /**
	     * The attribute key, by which the measurements are grouped.
	     */
	    readonly groupingKey: number | undefined;
	    /**
	     * In case the measurements are grouped by time, these are the time spans by which the measurements are grouped.
	     */
	    readonly groupingTimeSpan: MeasurementGroupingTimeSpan | undefined;
	    /**
	     * @private
	     */
	    constructor(groups: Iterable<MeasurementGroup>, groupingType: MeasurementGroupingType, groupingKey: number | undefined, groupingTimeSpan: MeasurementGroupingTimeSpan | undefined);
	    /**
	     * @private
	     */
	    [Symbol.iterator](): Iterator<MeasurementGroup>;
	    /**
	     * Returns an iter over all measurements.
	     */
	    iter(): Iter<MeasurementGroup>;
	    /**
	     * Gets the number of measurements in the collection.
	     */
	    readonly length: number;
	    /**
	     * @private
	     */
	    first(): MeasurementGroup | undefined;
	}
	/**
	 * Describes a set of measurements that have been grouped together by explicit or implicit grouping in PiWeb Monitor.
	 * @version 1.3
	 */
	export class MeasurementGroup extends MeasurementCollection {
	    /**
	     * The description of this measurement group
	     */
	    readonly description: string;
	    /**
	     * @private
	     */
	    constructor(description: string, measurements: Iterable<Measurement>);
	}
	/**
	 * Describes a measurement of an inspection plan part. A measurement is composed of measurement values that are associated to characteristics.
	 * The characteristics are the children of the part to which the measurement is associated.
	 */
	export class Measurement implements IAttributeItem {
	    /**
	     * Gets the attributes of this measurement.
	     */
	    readonly attributes: AttributeCollection;
	    /**
	     * @private
	     */
	    readonly measurementId: string;
	    /**
	     * @private
	     */
	    readonly partId: string;
	    /**
	     * @private
	     */
	    readonly _values: Map<string, MeasurementValue>;
	    /**
	     * @private
	     */
	    constructor(id: string, partId: string, attributes: Iterable<Attribute>, values: Iterable<MeasurementValue>);
	    /**
	     * @private
	     */
	    getMeasurementGuid(): string;
	    /**
	     * @private
	     */
	    getPartGuid(): string;
	    /**
	     * Returns the measurement value that is associated to the specified characteristic or `undefined` if the measurement contains no such measurement value.
	     * @param entity The inspection plan characteristic to search the value for.
	     */
	    findValueByEntity(entity: InspectionPlanItem): MeasurementValue | undefined;
	    /**
	     * Gets the number of measurement values associated to this measurement.
	     */
	    readonly valueCount: number;
	    /**
	     * Returns an iter over all values that are associated to this measurement. In case you fetched the measurements without values, the set is empty.
	     */
	    readonly allMeasurementValues: Iter<MeasurementValue>;
	    /**
	     * @private
	     */
	    first(): MeasurementValue | undefined;
	}
	/**
	 * Describes a measurement value of an inspection plan characteristic.
	 */
	export class MeasurementValue implements IAttributeItem {
	    /**
	     * Gets the attributes of this measurement value.
	     */
	    readonly attributes: AttributeCollection;
	    /**
	     * @private
	     */
	    readonly characteristicId: string;
	    /**
	     * Gets the measurement to which this measurement value belongs
	     */
	    measurement: Measurement;
	    /**
	     * @private
	     */
	    readonly measurementId: string;
	    /**
	     * @private
	     */
	    constructor(characteristicId: string, attributes: Iterable<Attribute>);
	    /**
	     * @private
	     */
	    getMeasurementGuid(): string;
	    /**
	     * @private
	     */
	    getCharacteristicGuid(): string;
	}
	/**
	 * Returns all measurements that are associated to the parts that are bound to the plot extension element with databinding.
	 * You can change the databinding and the measurement selection in PiWeb Designer.
	 * @host
	 */
	export function getMeasurementCollection(requestedAttributes?: Array<number> | undefined): MeasurementCollection;
	/**
	 * Returns the grouped measurements that are associated to the parts that are bound to the plot extension element with databinding.
	 * You can change the databinding and the measurement selection, as well as the grouping, in PiWeb Designer.
	 * @version 1.3
	 * @host
	 */
	export function getGroupedMeasurementCollection(requestedAttributes?: Array<number> | undefined): MeasurementGroupCollection;
}


declare module "piweb/data/path" {
	/**
	 * @module data
	 */
	/** second comment block, needed for module merging, don't remove */
	export { basename, extname, isAbsolute, join, relative, format, normalize, sep } from "piweb/resources/path";
	export { dirname as parentname } from "piweb/resources/path";
	export interface ParsedPath {
	    /**
	     * The full parent path such as '/Part1/Part2/Point'
	     */
	    parent: string;
	    /**
	     * The name of the inspection plan entity including extension (if any) such as 'Point.X'
	     */
	    base: string;
	    /**
	     * The extension (if any) such as '.X'
	     */
	    ext: string;
	    /**
	     * The inspection plan entity name without extension (if any) such as 'Point'
	     */
	    name: string;
	}
	/**
	 * Resolves {pathSegments} to an absolute path.
	 *
	 * If the right most argument isn't already absolute, arguments are prepended in right to left order, until an absolute path is found. If after using all paths still no absolute path is found, the path is considered relative to the root.
	 * The resulting path is normalized, and trailing slashes are removed unless the path gets resolved to the root.
	 *
	 * @param pathSegments string paths to join.  Non-string arguments are ignored.
	 */
	export function resolve(...pathSegments: any[]): string;
	/**
	 * Returns an object from a path string - the opposite of format().
	 *
	 * @param pathString path to evaluate.
	 */
	export function parse(pathString: string): ParsedPath;
	/**
	 * Escapes inspection plan entity names which would be invalid as a path element.
	 *
	 * @param name inspection plan entity name to escape.
	 */
	export function escapeEntityName(name: string): string;
}


declare module "piweb/data/plot" {
	/**
	 * @module data
	 */ /** */
	import { BufferReader } from 'internal/buffer_reader';
	import { Iter } from 'iter';
	/**
	* A vector is a tuple of three numbers that can act as position, size and direction.
	*/
	export class Vector {
	    constructor(x: number, y: number, z: number);
	    /**
	     * X-Coordinate.
	     */
	    x: number;
	    /**
	     * Y-Coordinate.
	     */
	    y: number;
	    /**
	     * Z-Coordinate.
	     */
	    z: number;
	}
	/**
	 * @private
	 */
	export function readVector(source: BufferReader): Vector;
	/**
	 * Known types of plot tolerances, usually used for different plot types.
	 */
	export type PlotToleranceType = "linear" | "radial" | "rectangular" | "spatial";
	/**
	 * @private
	 */
	export const enum PlotToleranceTypeId {
	    Linear = 0,
	    Radial = 1,
	    Rectangular = 2,
	    Spatial = 3,
	}
	/**
	 * Tolerance information for plot data.
	 */
	export abstract class PlotTolerance {
	    constructor(type: PlotToleranceType);
	    /**
	     * The kind of tolererance.
	     */
	    type: PlotToleranceType;
	}
	/**
	 * Tolerance with lower and upper boundary.
	 */
	export class LinearPlotTolerance extends PlotTolerance {
	    constructor(lower: number, upper: number);
	    lower: number;
	    upper: number;
	}
	/**
	 * Tolerance with a single radius for one-dimensional natural values.
	 */
	export class RadialPlotTolerance extends PlotTolerance {
	    constructor(radius: number);
	    radius: number;
	}
	/**
	 * Tolerance with a width and height for two-dimensional natural values.
	 */
	export class RectangularPlotTolerance extends PlotTolerance {
	    constructor(width: number, height: number);
	    width: number;
	    height: number;
	}
	/**
	 * Tolerance with three dimensions for three-dimensional natural values.
	 */
	export class SpatialPlotTolerance extends PlotTolerance {
	    constructor(x: number, y: number, z: number);
	    x: number;
	    y: number;
	    z: number;
	}
	/**
	 * @private
	 */
	export function readTolerance(source: BufferReader): PlotTolerance | undefined;
	/**
	 * Describes the transformation of the plot points.
	 */
	export class ElementSystem {
	    /**
	     * @private axis1
	     */
	    constructor(axis1: Vector, axis2: Vector, axis3: Vector, origin: Vector);
	    /**
	     * First column of the 4x3 element system
	     */
	    axis1: Vector;
	    /**
	     * Second column of the 4x3 element system
	     */
	    axis2: Vector;
	    /**
	     * Third column of the 4x3 element system
	     */
	    axis3: Vector;
	    /**
	     * Fourth column of the 4x3 element system
	     */
	    origin: Vector;
	}
	/**
	 * @private
	 */
	export function readElementSystem(source: BufferReader): ElementSystem;
	/**
	 * The supported datatypes for plot properties.
	 */
	export type PlotPropertyType = "string" | "integer" | "float" | "date" | "timespan";
	/**
	 * @private
	 */
	export const enum PlotPropertyTypeId {
	    String = 0,
	    Integer = 1,
	    Float = 2,
	    Date = 3,
	    TimeSpan = 4,
	}
	/**
	 * Represents the value of a plot property. Timespans are stored as a number, which is the number of milliseconds.
	 */
	export type PlotPropertyValue = string | number | Date;
	/**
	 * A key-value pair to store additional data in plots or plotpoints.
	 */
	export class PlotProperty {
	    constructor(name: string, description: string, type: PlotPropertyType, value: PlotPropertyValue);
	    name: string;
	    description: string;
	    value: PlotPropertyValue;
	    type: PlotPropertyType;
	}
	/**
	 * Describes an accessible collection of properties. The collection offers a wide range of helper
	 * functions to allow a type safe access to the properties values. You can iterate over the collection with a for ... of loop.
	 */
	export class PlotPropertyCollection {
	    /**
	     * @private
	     */
	    readonly _properties: Map<string, PlotProperty>;
	    constructor(properties: Iterable<PlotProperty>);
	    /**
	     * Returns an iterator over all properties.
	     */
	    [Symbol.iterator](): Iterator<PlotProperty>;
	    /**
	     * Returns an iter over all properties.
	     */
	    iter(): Iter<PlotProperty>;
	    /**
	     * Gets the number of properties stored in the collection.
	     */
	    readonly length: number;
	    /**
	     * Gets an iterator over the available name in the collection.
	     */
	    readonly names: Iter<string>;
	    /**
	     * Returns the property with the specified name, or `undefined` in case there is no property with this key.
	     * @param name The name of the property.
	     */
	    getPlotProperty(name: string): PlotProperty | undefined;
	    /**
	     * Returns the value of the property with the specified key, or `undefined` in case there is no property with this key.
	     * @param key The key of the property.
	     */
	    getValue(key: string): string | number | Date | undefined;
	    /**
	     * Returns the value of the property with the specified key as `string`, or `undefined` in case there is no property with this key.
	     * @param name The key of the property.
	     */
	    getStringValue(name: string): string | undefined;
	    /**
	     * Returns the value of the property with the specified key as integral `number`, or `undefined` in case there is no property with this key or the properties value can't be converted into an integral `number` representation.
	     * @param name The key of the property.
	     */
	    getIntegerValue(name: string): number | undefined;
	    /**
	     * Returns the value of the property with the specified key as floating point `number`, or `undefined` in case there is no property with this key or the properties value can't be converted into a floating point `number` representation.
	     * @param name The key of the property.
	     */
	    getFloatValue(name: string): number | undefined;
	    /**
	     * Returns the value of the property with the specified key as `Date`, or `undefined` in case there is no property with this key or the properties value can't be converted into a `Date` representation.
	     * @param name The key of the property.
	     */
	    getDateValue(name: string): Date | undefined;
	    /**
	     * Returns the value of the property with the specified key as `number`, which are the total milliseconds of the timespan, or `undefined` in case there is no property with this key or the properties value can't be converted into a `number` representation.
	     * @param name The key of the property.
	     */
	    getTimespanValue(name: string): number | undefined;
	    /**
	     * Returns the value of the property with the specified key as `number`, or `undefined` in case there is no property with this key or the properties value can't be converted into a `number` representation.
	     * @param key The key of the property.
	     */
	    getNumericValue(name: string): number | undefined;
	}
	/**
	 * @private
	 */
	export function readPlotProperty(source: BufferReader): PlotProperty;
	/**
	 * @private
	 */
	export function readPlotProperties(source: BufferReader): PlotPropertyCollection;
}


declare module "piweb/data/raw_data" {
	import { HostBinary } from 'piweb/resources/host_binary';
	import { InspectionPlanItem } from 'piweb/data/inspection';
	import { Measurement, MeasurementValue } from 'piweb/data/measurements';
	import { Iter } from 'iter';
	/**
	 * An enumeration to identify the entity to which a raw data item is attached.
	 */
	export type RawDataEntity = "part" | "characteristic" | "measurement" | "measurementValue";
	/**
	 * @private
	 */
	export function mapEntityType(entityType: number): RawDataEntity;
	/**
	 * Describes the information about a single raw data entry on the server. When fetching the raw data items, only these information are fetched from the server, not the data itself.
	 */
	export class RawDataItem {
	    /**
	     * @private
	     */
	    inspectionPlanItemId?: string;
	    /**
	     * @private
	     */
	    measurementId?: string;
	    /**
	     * @private
	     */
	    _checkSumBytes: Buffer;
	    /**
	     * Gets the type of the entity this item is attached to.
	     */
	    entityType: RawDataEntity;
	    /**
	     * Gets the key of this item.
	     */
	    key: number;
	    /**
	     * Gets the filename.
	     */
	    name: string;
	    /**
	     * Gets the size of the data in bytes.
	     */
	    size: number;
	    /**
	     * Gets the mime type.
	     */
	    mimeType?: string;
	    /**
	     * Gets the date when the item has been uploaded to the piweb server.
	     */
	    created: Date;
	    /**
	     * Gets the date when the item has been modified on the piweb server.
	     */
	    lastModified: Date;
	    constructor(entityType: RawDataEntity, inspectionPlanItemId: string | undefined, measurementId: string | undefined, checkSumBytes: Buffer, key: number, name: string, size: number, mimetype: string | undefined, created: Date, lastModified: Date);
	    /**
	     * @private
	     */
	    getCheckSum(): string;
	    /**
	     * @private
	     */
	    getInspectionGuid(): string | undefined;
	    /**
	     * @private
	     */
	    getMeasurementGuid(): string | undefined;
	    /**
	     * Returns the data associated to the [[RawDataItem]]. The data is returned as a [[HostBuffer]], which can be converted to a [[Buffer]] using the `makeBuffer` function.
	     */
	    getDataBuffer(): Buffer | undefined;
	    /**
	     * Returns the data associated to the [[RawDataItem]]. The data is returned as a [[Buffer]].
	     */
	    getData(): HostBinary | undefined;
	}
	/**
	 * Describes a list of raw data information with additional functions to access certain entries. You can iterate over the collection like the following:
	 *
	 *  * ```TypeScript
	 * const rawDataCollection = piweb.data.getRawDataCollection();
	 * for (let rawDataItem of rawDataCollection)
	 * {
	 *     ...
	 * }
	 * ```
	 */
	export class RawDataCollection {
	    /**
	     * @private
	     */
	    private readonly _items;
	    /**
	     * @private
	     */
	    constructor(items: Iterable<RawDataItem>);
	    /**
	     * @private
	     */
	    [Symbol.iterator](): Iterator<RawDataItem>;
	    /**
	     * Returns an iter over all raw data items.
	     */
	    iter(): Iter<RawDataItem>;
	    /**
	     * Gets the total number of items in this collection.
	     */
	    readonly length: number;
	    /**
	     * Returns the items that match one or more of the specified filter strings.
	     * @param wildcards One or more filter strings. Wildcards like '*' are allowed.
	     */
	    findByName(...wildcards: string[]): Iter<RawDataItem>;
	    /**
	     * Returns the raw data items that are associated to the specified entity.
	     * @param entity An instance of a raw data entity.
	     */
	    findByEntity(entity: InspectionPlanItem | Measurement | MeasurementValue): Iter<RawDataItem>;
	    /**
	     * @private
	     */
	    first(): RawDataItem | undefined;
	}
	/**
	 * Returns a list of all raw data entries that are bound to the plot extension via databinding. Since the raw data files are possibly quite large, they are not copied by the plot extension engine.
	 *
	 * ```TypeScript
	 * function getRawDataCollection() : RawDataCollection;
	 * ```
	 *
	 * You can specify the entity from which you wish to get the raw data in the package definition.
	 */
	export function getRawDataCollection(): RawDataCollection;
	/**
	 * @private
	 */
	export enum RawDataSourceIds {
	    None = 0,
	    Parts = 1,
	    Characteristics = 2,
	    Measurements = 4,
	    MeasurementValues = 8,
	}
	/**
	 * Sets the raw data entities from which the plot extension fetches the raw data. By default, the plot fetches raw data
	 * from all entities, including measurement values. When the databinding of the plot extension element features a lot of characteristics
	 * and measurements, the raw data fetching can have a large performance impact.
	 * @param sources
	 * @deprecated Use the property `raw_data_sources` in the [`package.json`](package.html#package-structure-extensions-raw-data-sources) instead.
	 */
	export function setRawDataSources(sources: Iterable<RawDataEntity>): void;
	/**
	 * Returns the raw data entities from which the plot extension fetches the raw data.
	 */
	export function getRawDataSources(): Iterable<RawDataEntity>;
}


declare module "piweb/data/volume" {
	import { HostBinary } from 'piweb/resources/host_binary';
	import { RawDataEntity } from 'piweb/data/raw_data';
	import { InspectionPlanItem } from 'piweb/data/inspection';
	import { Measurement, MeasurementValue } from 'piweb/data/measurements';
	import { Iter } from 'iter';
	import { PlotPropertyCollection } from 'piweb/data/plot';
	/**
	 * Known volume directions / planes
	 */
	export type VolumeDirection = "x" | "y" | "z";
	/**
	 * Describes a vector in the context of volumes, which can be accessed with a [[VolumeDirection]].
	 */
	export class VolumeVector {
	    /**
	     * X-Direction
	     */
	    x: number;
	    /**
	     * Y-Direction
	     */
	    y: number;
	    /**
	     * Z-Direction
	     */
	    z: number;
	    /**
	     * @private
	     */
	    constructor(x: number, y: number, z: number);
	    /**
	     * Returns the value of the vector in the specified direction.
	     * @param direction the volume direction.
	     */
	    get(direction: VolumeDirection): number;
	    /**
	     * Sets the value of the vector in the specified direction.
	     * @param direction the volume direction.
	     */
	    set(direction: VolumeDirection, value: number): void;
	}
	/**
	 * Describes the information about a single volume.
	 */
	export class Volume {
	    /**
	     * The entity type to which the volume is attached.
	     */
	    entity: RawDataEntity;
	    /**
	     * Gets the key of this item.
	     */
	    key: number;
	    /**
	     * @private
	     */
	    measurementId?: string;
	    /**
	     * @private
	     */
	    inspectionPlanItemId?: string;
	    /**
	     * Gets the filename.
	     */
	    name: string;
	    /**
	     * Gets the size of the volume in voxels.
	     */
	    size: VolumeVector;
	    /**
	     * Gets the size of a single voxel of the volume in mm.
	     */
	    resolution: VolumeVector;
	    /**
	     * Gets a collection of user data that is attached to this volume.
	     */
	    properties: PlotPropertyCollection;
	    /**
	     * @private
	     */
	    constructor(entity: RawDataEntity, inspectionPlanItemId: string | undefined, measurementId: string | undefined, key: number, name: string, size: VolumeVector, resolution: VolumeVector, properties: PlotPropertyCollection);
	    /**
	     * @private
	     */
	    getInspectionGuid(): string | undefined;
	    /**
	     * @private
	     */
	    getMeasurementGuid(): string | undefined;
	    /**
	     * Returns the slice with the specified index in the specified direction as [[Buffer]].
	     */
	    getSliceBuffer(direction: VolumeDirection, index: number): Buffer | undefined;
	    /**
	     * Returns the slice with the specified index in the specified direction as [[HostBinary]].
	     */
	    getSlice(direction: VolumeDirection, index: number): HostBinary | undefined;
	}
	/**
	 * Describes a list of volumes with additional functions to access certain entries. You can iterate over the collection like the following:
	 *
	 * ```TypeScript
	 * const volumeCollection = piweb.data.getVolumeCollection();
	 * for (let volume of volumeCollection)
	 * {
	 *     ...
	 * }
	 * ```
	 */
	export class VolumeCollection {
	    /**
	     * @private
	     */
	    private readonly _items;
	    /**
	     * @private
	     */
	    constructor(items: Iterable<Volume>);
	    /**
	     * @private
	     */
	    [Symbol.iterator](): Iterator<Volume>;
	    /**
	     * Returns an iter over all volume items.
	     */
	    iter(): Iter<Volume>;
	    /**
	     * Gets the total number of items in this collection.
	     */
	    readonly length: number;
	    /**
	     * Returns the items that match one or more of the specified filter strings.
	     * @param wildcards One or more filter strings. Wildcards like '*' are allowed.
	     */
	    findByName(...wildcards: string[]): Iter<Volume>;
	    /**
	     * Returns the volume items that are associated to the specified entity.
	     * @param entity An instance of a volume entity.
	     */
	    findByEntity(entity: InspectionPlanItem | Measurement | MeasurementValue): Iter<Volume>;
	    /**
	     * @private
	     */
	    first(): Volume | undefined;
	}
	/**
	 * Returns a list of all volumes that are bound to the plot extension via databinding. Since the volumes are possibly very large, they are not copied by the plot extension engine.
	 *
	 * ```TypeScript
	 * function getVolumeCollection() : VolumeCollection;
	 * ```
	 *
	 * You can specify the entity from which you wish to get the volume in the package definition.
	 *
	 */
	export function getVolumeCollection(): VolumeCollection;
	/**
	 * Sets the raw data entities from which the plot extension fetches the volumes.
	 * @param sources
	 * @deprecated Use the property `volume_sources` in the [`package.json`](package.html#package-structure-extensions-volume-sources) instead.
	 */
	export function setVolumeSources(sources: Iterable<RawDataEntity>): void;
	/**
	 * Returns the raw data entities from which the plot extension fetches the volumes.
	 */
	export function getVolumeSources(): Iterable<RawDataEntity>;
}


declare module "piweb/data/wellknown_keys" {
	/**
	 * @module data
	 */ /** */
	/**
	 * Describes a set of attribute keys that are known and/or interpreted by PiWeb for certain evaluations.
	 */
	export namespace WellKnownKeys {
	    /**
	     * Describes the known attribute keys for inspection plan parts.
	     */
	    namespace Part {
	        const Number: number;
	        const Description: number;
	        const Abbreviation: number;
	        const DrawingStatus: number;
	        const Line: number;
	        const ControlItem: number;
	        const VariantOfLine: number;
	        const DrawingNumber: number;
	        const DrawingName: number;
	        const Operation: number;
	        const Organisation: number;
	        const CostCenter: number;
	        const InspectionType: number;
	        const Plant: number;
	        const CallbackUri: number;
	        const CallbackUriText: number;
	        const AdjustmentDate: number;
	        const CreationDate: number;
	        const CreatedBy: number;
	        const UpdateDate: number;
	        const UpdatedBy: number;
	        const OrganisationalUnit: number;
	        const ProductionLine: number;
	        const Responsible: number;
	        const Comment: number;
	    }
	    /**
	     * Describes the known attribute keys for inspection plan characteristics.
	     */
	    namespace Characteristic {
	        const Number: number;
	        const Description: number;
	        const Abbreviation: number;
	        const Direction: number;
	        const GroupType: number;
	        const MeasurementPointRole: number;
	        const Position: number;
	        const Orientation: number;
	        const ControlItem: number;
	        const DistributionType: number;
	        const LogicalOperationString: number;
	        const DecimalPlaces: number;
	        const DesiredValue: number;
	        const NominalValue: number;
	        const LowerSpecificationLimit: number;
	        const UpperSpecificationLimit: number;
	        const LowerTolerance: number;
	        const UpperTolerance: number;
	        const LowerScrapLimit: number;
	        const UpperScrapLimit: number;
	        const LowerBoundaryType: number;
	        const UpperBoundaryType: number;
	        const Unit: number;
	        const Category: number;
	        const I: number;
	        const J: number;
	        const K: number;
	        const X: number;
	        const Y: number;
	        const Z: number;
	        const Layer: number;
	        const HasStamp: number;
	        const StampCaption: number;
	        const StampPositionX: number;
	        const StampPositionY: number;
	        const StampTargetX: number;
	        const StampTargetY: number;
	        const StampRadius: number;
	        const AuditFunction: number;
	        const LowerControlLimit: number;
	        const UpperControlLimit: number;
	        const LowerWarningLimit: number;
	        const UpperWarningLimit: number;
	        const CharacteristicType: number;
	        const MeasurementValueCatalog: number;
	        const PlotMeasurand: number;
	        const CharacteristicSpecification: number;
	        const FeatureName: number;
	        const OperationType: number;
	        const CallbackUri: number;
	        const CallbackUriText: number;
	        const MeasuredQuantityType: number;
	        const PdaSampleSize: number;
	        const PdaSampleType: number;
	        const DistributionAnalysisMode: number;
	        const LocationChartConfiguration: number;
	        const LocationChartAverageValue: number;
	        const LocationChartLowerControlLimit: number;
	        const LocationChartUpperControlLimit: number;
	        const LocationChartLowerWarningLimit: number;
	        const LocationChartUpperWarningLimit: number;
	        const VariationChartConfiguration: number;
	        const VariationChartAverageValue: number;
	        const VariationChartLowerControlLimit: number;
	        const VariationChartUpperControlLimit: number;
	        const VariationChartLowerWarningLimit: number;
	        const VariationChartUpperWarningLimit: number;
	    }
	    /**
	     * Describes the known attribute keys for measurements.
	     */
	    namespace Measurement {
	        const Time: number;
	        const EventId: number;
	        const BatchNumber: number;
	        const InspectorName: number;
	        const Comment: number;
	        const MachineNumber: number;
	        const ProcessId: number;
	        const InspectionEquipment: number;
	        const ProcessValue: number;
	        const PartsId: number;
	        const InspectionType: number;
	        const ProductionNumber: number;
	        const Contract: number;
	        const Shift: number;
	        const PartNumberIncremental: number;
	        const MeasurementStatus: number;
	        const MeasurementChangeDate: number;
	        const MeasurementChangedBy: number;
	        const AggregationJobUuid: number;
	        const AggregationInterval: number;
	        const AggregatedMeasurementCount: number;
	    }
	    /**
	     * Describes the known attribute keys for catalogs.
	     */
	    namespace Catalog {
	        const ColorSchemePositionKey: number;
	        const StatusColorKey: number;
	        const LowerClassLimitKey: number;
	        const UpperClassLimitKey: number;
	        const DistributionTypeKey: number;
	        const MeasuredQuantityTypeKey: number;
	        const PdaSampleTypeDescription: number;
	        const PdaSampleTypeKey: number;
	        const DistributionAnalysisModeDescription: number;
	        const DistributionAnalysisModeKey: number;
	    }
	    /**
	     * Describes the known attribute keys for measurement values.
	     */
	    namespace Value {
	        const MeasuredValue: number;
	        const AggregatedMinimum: number;
	        const AggregatedMaximum: number;
	        const AggregatedRange: number;
	        const AggregatedMean: number;
	        const AggregatedSigma: number;
	        const AggregatedMedian: number;
	        const AggregatedLowerQuartile: number;
	        const AggregatedUpperQuartile: number;
	        const AggregatedCp: number;
	        const AggregatedCpk: number;
	        const AggregatedValueCount: number;
	        const AggregatedYellowRange: number;
	        const AggregatedRedRange: number;
	    }
	}
}


declare module "piweb/package" {
	
}


declare module "piweb/package/package" {
	
}


declare module "piweb/resources/host_binary" {
	/**
	 * @module resources
	 */ /** */
	/**
	 * Describes a binary object that lives in the context of the PiWeb host application.
	 */
	export interface HostBinary {
	    /**
	     * Returns a buffer with the same data as the binary.
	     */
	    makeBuffer(): Buffer;
	    /**
	     * Gets the size of the binary object in bytes.
	     */
	    readonly size: number;
	    /**
	     * Gets the id with which the binary can be uniquely identified.
	     */
	    readonly id: string;
	}
}


declare module "piweb/resources" {
	/**
	 * @module resources
	 * @preferred
	 *
	 * ## Introduction
	 *
	 * The `piweb.resources` module can be used to access files that are located in the extension package. The returned data can be used to initialize images,
	 * that can later be drawn to a drawing context, as shown in the example below:
	 *
	 * ```TypeScript
	 * import * as piweb from 'piweb'
	 *
	 * piweb.events.on("render", render);
	 *
	 * function render(context: piweb.drawing.DrawingContext) {
	 *
	 * 	const buffer = piweb.resources.readFileBufferSync("icon.png");
	 * 	const image = new piweb.drawing.Bitmap(buffer);
	 * 	context.drawImage(image);
	 * }
	 * ```
	 *
	 */
	/** file */
	import { HostBinary } from "piweb/resources/host_binary";
	export { HostBinary };
	import * as path from "piweb/resources/path";
	export { path };
	/**
	 * Returns a buffer that contains the data of the file at the specified path.
	 * @param path
	 */
	export function readFileBufferSync(path: string): Buffer;
	/**
	 * Returns a host binary that contains the data of the file at the specified path.
	 * @param path
	 */
	export function readFileSync(path: string): HostBinary;
}


declare module "piweb/resources/path" {
	export interface ParsedPath {
	    /**
	     * The root of the path such as '/' or 'c:\'
	     */
	    root: string;
	    /**
	     * The full directory path such as '/home/user/dir'
	     */
	    dir: string;
	    /**
	     * The file name including extension (if any) such as 'index.html'
	     */
	    base: string;
	    /**
	     * The file extension (if any) such as '.html'
	     */
	    ext: string;
	    /**
	     * The file name without extension (if any) such as 'index'
	     */
	    name: string;
	}
	/**
	 * The right-most parameter is considered {to}.  Other parameters are considered an array of {from}.
	 *
	 * Starting from leftmost {from} paramter, resolves {to} to an absolute path.
	 *
	 * If {to} isn't already absolute, {from} arguments are prepended in right to left order, until an absolute path is found. If after using all {from} paths still no absolute path is found, the current working directory is used as well. The resulting path is normalized, and trailing slashes are removed unless the path gets resolved to the root directory.
	 *
	 * @param pathSegments string paths to join.  Non-string arguments are ignored.
	 */
	export function resolve(...pathSegments: any[]): string;
	/**
	 * Normalize a string path, reducing '..' and '.' parts.
	 * When multiple slashes are found, they're replaced by a single one; when the path contains a trailing slash, it is preserved.
	 *
	 * @param p string path to normalize.
	 */
	export function normalize(p: string): string;
	/**
	 * Determines whether {path} is an absolute path. An absolute path will always resolve to the same location, regardless of the working directory.
	 *
	 * @param path path to test.
	 */
	export function isAbsolute(path: string): boolean;
	/**
	 * Join all arguments together and normalize the resulting path.
	 * Arguments must be strings.
	 *
	 * @param paths paths to join.
	 */
	export function join(...paths: string[]): string;
	/**
	 * Solve the relative path from {from} to {to}.
	 * At times we have two absolute paths, and we need to derive the relative path from one to the other. This is actually the reverse transform of path.resolve.
	 *
	 * @param from
	 * @param to
	 */
	export function relative(from: string, to: string): string;
	/**
	 * Return the directory name of a path. Similar to the Unix dirname command.
	 *
	 * @param p the path to evaluate.
	 */
	export function dirname(p: string): string;
	/**
	 * Return the last portion of a path. Similar to the Unix basename command.
	 * Often used to extract the file name from a fully qualified path.
	 *
	 * @param p the path to evaluate.
	 * @param ext optionally, an extension to remove from the result.
	 */
	export function basename(p: string, ext?: string): string;
	/**
	 * Return the extension of the path, from the last '.' to end of string in the last portion of the path.
	 * If there is no '.' in the last portion of the path or the first character of it is '.', then it returns an empty string
	 *
	 * @param p the path to evaluate.
	 */
	export function extname(p: string): string;
	/**
	 * Returns a path string from an object - the opposite of parse().
	 *
	 * @param pathString path to evaluate.
	 */
	export function format(pathObject: ParsedPath): string;
	/**
	 * Returns an object from a path string - the opposite of format().
	 *
	 * @param pathString path to evaluate.
	 */
	export function parse(pathString: string): ParsedPath;
	/**
	 * The path separator: '/'.
	 */
	export const sep: string;
	/**
	 * The path delimiter: ':'
	 */
	export const delimiter: string;
}


declare module "piweb/tips" {
	
}


declare module "piweb/tips/package" {
	
}




//declare var process: NodeJS.Process;
declare var global: NodeJS.Global;

declare var __filename: string;
declare var __dirname: string;

declare namespace NodeJS {
    export interface Global {
        global: Global;
        Buffer: typeof Buffer;
        console: typeof console;
    }
}

interface NodeRequireFunction {
    (id: string): any;
}

interface NodeRequire extends NodeRequireFunction {
    resolve(id: string): string;
    cache: any;
    extensions: any;
    main: any;
}

declare var require: NodeRequire;

interface NodeModule {
    exports: any;
    require: NodeRequireFunction;
    id: string;
    filename: string;
    loaded: boolean;
    parent: any;
    children: any[];
}

declare var module: NodeModule;
declare var exports: any;

// Buffer class
type BufferEncoding = "ascii" | "utf8" | "utf16le" | "ucs2" | "binary" | "hex";
interface Buffer extends NodeBuffer { }

/**
 * Raw data is stored in instances of the Buffer class.
 * A Buffer is similar to an array of integers but corresponds to a raw memory allocation outside the V8 heap.  A Buffer cannot be resized.
 * Valid string encodings: 'ascii'|'utf8'|'utf16le'|'ucs2'(alias of 'utf16le')|'base64'|'binary'(deprecated)|'hex'
 */
declare var Buffer: {
    /**
     * Allocates a new buffer containing the given {str}.
     *
     * @param str String to store in buffer.
     * @param encoding encoding to use, optional.  Default is 'utf8'
     */
    new (str: string, encoding?: string): Buffer;
    /**
     * Allocates a new buffer of {size} octets.
     *
     * @param size count of octets to allocate.
     */
    new (size: number): Buffer;
    /**
     * Allocates a new buffer containing the given {array} of octets.
     *
     * @param array The octets to store.
     */
    new (array: Uint8Array): Buffer;
    /**
     * Produces a Buffer backed by the same allocated memory as
     * the given {ArrayBuffer}.
     *
     *
     * @param arrayBuffer The ArrayBuffer with which to share memory.
     */
    new (arrayBuffer: ArrayBuffer): Buffer;
    /**
     * Allocates a new buffer containing the given {array} of octets.
     *
     * @param array The octets to store.
     */
    new (array: any[]): Buffer;
    /**
     * Copies the passed {buffer} data onto a new {Buffer} instance.
     *
     * @param buffer The buffer to copy.
     */
    new (buffer: Buffer): Buffer;
    prototype: Buffer;
    /**
     * Allocates a new Buffer using an {array} of octets.
     *
     * @param array
     */
    from(array: any[]): Buffer;
    /**
     * When passed a reference to the .buffer property of a TypedArray instance,
     * the newly created Buffer will share the same allocated memory as the TypedArray.
     * The optional {byteOffset} and {length} arguments specify a memory range
     * within the {arrayBuffer} that will be shared by the Buffer.
     *
     * @param arrayBuffer The .buffer property of a TypedArray or a new ArrayBuffer()
     * @param byteOffset
     * @param length
     */
    from(arrayBuffer: ArrayBuffer, byteOffset?: number, length?: number): Buffer;
    /**
     * Copies the passed {buffer} data onto a new Buffer instance.
     *
     * @param buffer
     */
    from(buffer: Buffer): Buffer;
    /**
     * Creates a new Buffer containing the given JavaScript string {str}.
     * If provided, the {encoding} parameter identifies the character encoding.
     * If not provided, {encoding} defaults to 'utf8'.
     *
     * @param str
     */
    from(str: string, encoding?: string): Buffer;
    /**
     * Returns true if {obj} is a Buffer
     *
     * @param obj object to test.
     */
    isBuffer(obj: any): obj is Buffer;
    /**
     * Returns true if {encoding} is a valid encoding argument.
     * Valid string encodings in Node 0.12: 'ascii'|'utf8'|'utf16le'|'ucs2'(alias of 'utf16le')|'base64'|'binary'(deprecated)|'hex'
     *
     * @param encoding string to test.
     */
    isEncoding(encoding: string): boolean;
    /**
     * Gives the actual byte length of a string. encoding defaults to 'utf8'.
     * This is not the same as String.prototype.length since that returns the number of characters in a string.
     *
     * @param string string to test.
     * @param encoding encoding used to evaluate (defaults to 'utf8')
     */
    byteLength(string: string, encoding?: string): number;
    /**
     * Returns a buffer which is the result of concatenating all the buffers in the list together.
     *
     * If the list has no items, or if the totalLength is 0, then it returns a zero-length buffer.
     * If the list has exactly one item, then the first item of the list is returned.
     * If the list has more than one item, then a new Buffer is created.
     *
     * @param list An array of Buffer objects to concatenate
     * @param totalLength Total length of the buffers when concatenated.
     *   If totalLength is not provided, it is read from the buffers in the list. However, this adds an additional loop to the function, so it is faster to provide the length explicitly.
     */
    concat(list: Buffer[], totalLength?: number): Buffer;
    /**
     * The same as buf1.compare(buf2).
     */
    compare(buf1: Buffer, buf2: Buffer): number;
    /**
     * Allocates a new buffer of {size} octets.
     *
     * @param size count of octets to allocate.
     * @param fill if specified, buffer will be initialized by calling buf.fill(fill).
     *    If parameter is omitted, buffer will be filled with zeros.
     * @param encoding encoding used for call to buf.fill while initalizing
     */
    alloc(size: number, fill?: string | Buffer | number, encoding?: string): Buffer;
    /**
     * Allocates a new buffer of {size} octets, leaving memory not initialized, so the contents
     * of the newly created Buffer are unknown and may contain sensitive data.
     *
     * @param size count of octets to allocate
     */
    allocUnsafe(size: number): Buffer;
    /**
     * Allocates a new non-pooled buffer of {size} octets, leaving memory not initialized, so the contents
     * of the newly created Buffer are unknown and may contain sensitive data.
     *
     * @param size count of octets to allocate
     */
    allocUnsafeSlow(size: number): Buffer;
};

/************************************************
*                                               *
*               GLOBAL INTERFACES               *
*                                               *
************************************************/

interface NodeBuffer extends Uint8Array {
    write(string: string, offset?: number, length?: number, encoding?: string): number;
    toString(encoding?: string, start?: number, end?: number): string;
    toJSON(): { type: 'Buffer', data: any[] };
    equals(otherBuffer: Buffer): boolean;
    compare(otherBuffer: Buffer, targetStart?: number, targetEnd?: number, sourceStart?: number, sourceEnd?: number): number;
    copy(targetBuffer: Buffer, targetStart?: number, sourceStart?: number, sourceEnd?: number): number;
    slice(start?: number, end?: number): Buffer;
    writeUIntLE(value: number, offset: number, byteLength: number, noAssert?: boolean): number;
    writeUIntBE(value: number, offset: number, byteLength: number, noAssert?: boolean): number;
    writeIntLE(value: number, offset: number, byteLength: number, noAssert?: boolean): number;
    writeIntBE(value: number, offset: number, byteLength: number, noAssert?: boolean): number;
    readUIntLE(offset: number, byteLength: number, noAssert?: boolean): number;
    readUIntBE(offset: number, byteLength: number, noAssert?: boolean): number;
    readIntLE(offset: number, byteLength: number, noAssert?: boolean): number;
    readIntBE(offset: number, byteLength: number, noAssert?: boolean): number;
    readUInt8(offset: number, noAssert?: boolean): number;
    readUInt16LE(offset: number, noAssert?: boolean): number;
    readUInt16BE(offset: number, noAssert?: boolean): number;
    readUInt32LE(offset: number, noAssert?: boolean): number;
    readUInt32BE(offset: number, noAssert?: boolean): number;
    readInt8(offset: number, noAssert?: boolean): number;
    readInt16LE(offset: number, noAssert?: boolean): number;
    readInt16BE(offset: number, noAssert?: boolean): number;
    readInt32LE(offset: number, noAssert?: boolean): number;
    readInt32BE(offset: number, noAssert?: boolean): number;
    readFloatLE(offset: number, noAssert?: boolean): number;
    readFloatBE(offset: number, noAssert?: boolean): number;
    readDoubleLE(offset: number, noAssert?: boolean): number;
    readDoubleBE(offset: number, noAssert?: boolean): number;
    swap16(): Buffer;
    swap32(): Buffer;
    swap64(): Buffer;
    writeUInt8(value: number, offset: number, noAssert?: boolean): number;
    writeUInt16LE(value: number, offset: number, noAssert?: boolean): number;
    writeUInt16BE(value: number, offset: number, noAssert?: boolean): number;
    writeUInt32LE(value: number, offset: number, noAssert?: boolean): number;
    writeUInt32BE(value: number, offset: number, noAssert?: boolean): number;
    writeInt8(value: number, offset: number, noAssert?: boolean): number;
    writeInt16LE(value: number, offset: number, noAssert?: boolean): number;
    writeInt16BE(value: number, offset: number, noAssert?: boolean): number;
    writeInt32LE(value: number, offset: number, noAssert?: boolean): number;
    writeInt32BE(value: number, offset: number, noAssert?: boolean): number;
    writeFloatLE(value: number, offset: number, noAssert?: boolean): number;
    writeFloatBE(value: number, offset: number, noAssert?: boolean): number;
    writeDoubleLE(value: number, offset: number, noAssert?: boolean): number;
    writeDoubleBE(value: number, offset: number, noAssert?: boolean): number;
    fill(value: any, offset?: number, end?: number): this;
    indexOf(value: string | number | Buffer, byteOffset?: number, encoding?: string): number;
    lastIndexOf(value: string | number | Buffer, byteOffset?: number, encoding?: string): number;
    entries(): IterableIterator<[number, number]>;
    includes(value: string | number | Buffer, byteOffset?: number, encoding?: string): boolean;
    keys(): IterableIterator<number>;
    values(): IterableIterator<number>;
}

/************************************************
*                                               *
*                   MODULES                     *
*                                               *
************************************************/

declare module "assert" {
    function internal(value: any, message?: string): void;
    namespace internal {
        export class AssertionError implements Error {
            name: string;
            message: string;
            actual: any;
            expected: any;
            operator: string;
            generatedMessage: boolean;

            constructor(options?: {
                message?: string; actual?: any; expected?: any;
                operator?: string; stackStartFunction?: Function
            });
        }

        export function fail(actual: any, expected: any, message: string, operator: string): void;
        export function ok(value: any, message?: string): void;
        export function equal(actual: any, expected: any, message?: string): void;
        export function notEqual(actual: any, expected: any, message?: string): void;
        export function deepEqual(actual: any, expected: any, message?: string): void;
        export function notDeepEqual(acutal: any, expected: any, message?: string): void;
        export function strictEqual(actual: any, expected: any, message?: string): void;
        export function notStrictEqual(actual: any, expected: any, message?: string): void;
        export function deepStrictEqual(actual: any, expected: any, message?: string): void;
        export function notDeepStrictEqual(actual: any, expected: any, message?: string): void;
        export var throws: {
            (block: Function, message?: string): void;
            (block: Function, error: Function, message?: string): void;
            (block: Function, error: RegExp, message?: string): void;
            (block: Function, error: (err: any) => boolean, message?: string): void;
        };

        export var doesNotThrow: {
            (block: Function, message?: string): void;
            (block: Function, error: Function, message?: string): void;
            (block: Function, error: RegExp, message?: string): void;
            (block: Function, error: (err: any) => boolean, message?: string): void;
        };

        export function ifError(value: any): void;
    }

    export = internal;
}

declare module "buffer" {
    export var INSPECT_MAX_BYTES: number;
    var BuffType: typeof Buffer;
    export { BuffType as Buffer };
}

declare module "util" {
    export interface InspectOptions {
        showHidden?: boolean;
        depth?: number;
        colors?: boolean;
        customInspect?: boolean;
    }

    export function format(format: any, ...param: any[]): string;
    // export function debug(string: string): void;
    // export function error(...param: any[]): void;
    // export function puts(...param: any[]): void;
    // export function print(...param: any[]): void;
    export function log(format: any, ...param: any[]): void;
    export function inspect(object: any, showHidden?: boolean, depth?: number, color?: boolean): string;
    export function inspect(object: any, options: InspectOptions): string;
    export function isArray(object: any): boolean;
    export function isRegExp(object: any): boolean;
    export function isDate(object: any): boolean;
    export function isError(object: any): boolean;
    export function inherits(constructor: any, superConstructor: any): void;
    export function debuglog(key: string): (msg: string, ...param: any[]) => void;
    export function isBoolean(object: any): boolean;
    export function isBuffer(object: any): boolean;
    export function isFunction(object: any): boolean;
    export function isNull(object: any): boolean;
    export function isNullOrUndefined(object: any): boolean;
    export function isNumber(object: any): boolean;
    export function isObject(object: any): boolean;
    export function isPrimitive(object: any): boolean;
    export function isString(object: any): boolean;
    export function isSymbol(object: any): boolean;
    export function isUndefined(object: any): boolean;
    //export function deprecate(fn: Function, message: string): Function;
}

declare module "iter" {
    export interface Comparer<T> {
        (a: T, b: T): number;
    }

    export interface Equals<T> {
        (a: T, b: T): boolean;
    }

    export interface Combine<T, U> {
        (a: T, b: U): U;
    }

    export interface Transform<T, U> {
        (a: T): U;
    }

    export interface Predicate<T> {
        (a: T): boolean;
    }

    export interface Process<T> {
        (a: T): void;
    }

    export interface Generator<T> {
        (): Iterator<T>;
    }

    export interface IndexValue<T> {
		index: number;
		value: T;
    }

    export interface MismatchResult<T> {
        lhsValue: T;
        rhsValue: T;
        index: number;
    }

    export interface MinmaxResult<T> {
        min: T;
        max: T;
    }

    export interface Iter<T> extends Iterable<T> {
		/**
		 * Applies a transformation function to each value in an iter. The returned iter contains the transformed values.
		 * @param {transform} transform The transformation function to apply.
		 * @example
		 * const it = iter([1, 2, 3, 4]).map(x => x * 2);
		 * // 'it' contains: 2, 4, 6, 8
		 * @returns {iter_type}
		 */
		map<U>(transform: Transform<T, U>): Iter<U>;
		/**
		 * Filters an iter based on a predicate function. The returned iter contains only values for which the predicate function returns true.
		 * @param {predicate} predicate The predicate function used to determine whether each value is in the returned iter.
		 * @example
		 * const it = iter([1, 2, 3, 4]).filter(x => x % 2 === 0);
		 * // 'it' contains: 2, 4
		 * @returns {iter_type}
		 */
        filter(predicate: Predicate<T>): Iter<T>;
		/**
		 * Takes a number of values from this iter, and discards all later values.
		 * @param {number|predicate} numberOrPredicate If a number, then this is the number of values to take from the iter. If a predicate, then values are taken from the iter as long as the predicate returns true. As soon as it returns false, the returned iter ends.
		 * @example
		 * const it = iter(['a', 'b', 'c', 'd', 'e']).take(3);
		 * // 'it' contains: 'a', 'b', 'c'
		 * @example
		 * const it = iter(1, 2, 3, 2, 4).take(x => x < 3);
		 * // 'it' contains: 1, 2
		 * @returns {iter_type}
		 */
		take(numberOrPredicate: (number | Predicate<T>)): Iter<T>;
        skip(numberOrPredicate: (number | Predicate<T>)): Iter<T>;
        do(process: Process<T>): Iter<T>;
        buffer(size: number): Iter<T[]>;
        window(size: number): Iter<T[]>;
        flatten<U>(transform?: Transform<T, Iterable<U>>): Iter<U>;
        filterConsecutiveDuplicates(equals?: Equals<T>): Iter<T>;
        scan(combine: Combine<T, T>, seed?: T): Iter<T>;
        scan<U>(combine: Combine<T, U>, seed: U): Iter<U>;
        concat(...others: Iterable<T>[]): Iter<T>;
        concat(...others: Iterable<any>[]): Iter<any>;
        repeat(count?: number): Iter<T>;
        zip(...others: Iterable<T>[]): Iter<T[]>;
        zip(...others: Iterable<any>[]): Iter<any[]>;
        merge(other: Iterable<T>, comparer?: Comparer<T>): Iter<T>;
        setUnion(other: Iterable<T>, comparer?: Comparer<T>): Iter<T>;
        setIntersection(other: Iterable<T>, comparer?: Comparer<T>): Iter<T>;
        setSymmetricDifference(other: Iterable<T>, comparer?: Comparer<T>): Iter<T>;
        setDifference(other: Iterable<T>, comparer?: Comparer<T>): Iter<T>;
		interleave<U>(other: Iterable<U>): Iter<(T | U)>;
		
		/**
		 * Returns an index-value-pair for each value in this iter.
		 * @example
		 * const it = iter(['a', 'b', 'c']).enumerate();
		 * // 'it' contains: {index: 0, value: 'a'}, {index: 1, value: 'b'}, {index: 2, value: 'c'}
		 */
		enumerate(): Iter<IndexValue<T>>;

		/**
		 * Iterates through the values of this iter, invoking a processing function for each value.
		 * @param {process} [process] The function to call for each value. If not specified, this function will still iterate through the values of this iter, causing any side effects.
		 * @example
		 * let result = 0;
		 * iter([1, 2, 3]).forEach(x => { result += x; });
		 * // result: 6
		 */
        forEach(process: Process<T>): void;
		/**
		 * Determines the number of values in this iter. This function will iterate through the entire iter.
		 * @example
		 * const result = iter([1, 2, 3]).count();
		 * // result: 3
		 * @returns {number}
		 */
		count(): number;
		/**
		 * Determines whether an iter is empty.
		 * @example
		 * const result = iter([1, 2, 3]).isEmpty();
		 * // result: false
		 * @example
		 * const result = iter().isEmpty();
		 * // result: true
		 * @returns {boolean}
		 */
        isEmpty(): boolean;
		/**
		 * Returns the first value in this iter. If this iter is empty, this function returns undefined.
		 * @example
		 * const result = iter(['bob', 'sue']).first();
		 * // result: 'bob'
		 * @example
		 * const result = iter().first();
		 * // result: undefined
		 */
		first(predicate?: Predicate<T> | undefined): T | undefined;
		/**
		 * Returns the last value in this iter. If this iter is empty, this function returns undefined.
		 * @example
		 * const result = iter(['bob', 'beth', 'sue']).last();
		 * // result: 'sue'
		 * @example
		 * const result = iter().last();
		 * // result: undefined
		 */
		last(): T | undefined;
		/**
		 * Returns a specified value from this iter. If this iter is empty, this function returns undefined.
		 * @param {number} index The index of the value to return.
		 * @example
		 * const result = iter(['bob', 'beth', 'sue']).at(1);
		 * // result: 'beth'
		 * @example
		 * const result = iter(['bob', 'beth', 'sue']).at(100);
		 * // result: undefined
		 */
		at(index: number): T | undefined;
		/**
		 * Returns the first value in this iter that satisfies a predicate. If this iter is empty, this function returns undefined.
		 * @param {predicate} predicate The function used to determine whether this is the value we're searching for.
		 * @example
		 * const result = iter(['bob', 'beth', 'sue']).find(x => x[0] === 's');
		 * // result: { value: 'sue', index: 2 }
		 * @example
		 * const result = iter(['bob', 'beth', 'sue']).find(x => x[0] === 'x');
		 * // result: undefined
		 */
		find(predicate: Predicate<T>): T | undefined;
		/**
		 * Determines whether the specified predicate returns true for every value in this iter.
		 * @param {predicate} predicate The predicate to evaluate for each value in this iter.
		 * @example
		 * const result = iter(['bob', 'beth', 'sue']).every(x => typeof x === 'string');
		 * // result: true
		 * @returns {boolean}
		 */
		every(predicate: Predicate<T>): boolean;
		/**
		 * Determines whether the specified predicate returns true for any value in this iter.
		 * @param {predicate} predicate The predicate to evaluate for each value in this iter.
		 * @example
		 * const result = iter(['bob', 'beth', 'sue']).some(x => x[0] === 's');
		 * // result: true
		 * @returns {boolean}
		 */
		some(predicate: Predicate<T>): boolean;
		/**
		 * Determines the minimum value in this iter. Returns the minimum value. If this iter is empty, this function returns undefined.
		 * @param {comparer} [comparer] A callback used to compare items. If not specified, this function uses the < and > operators to compare items.
		 * @example
		 * const result = iter(['bob', 'beth', 'sue']).min();
		 * // result: 'beth'
		 */
		min(comparer?: Comparer<T>): T | undefined;
		/**
		 * Determines the maximum value in this iter. Returns the maximum value. If this iter is empty, this function returns undefined.
		 * @param {comparer} [comparer] A callback used to compare items. If not specified, this function uses the < and > operators to compare items.
		 * @example
		 * const result = iter(['bob', 'beth', 'sue']).max();
		 * // result: 'sue'
		 */
		max(comparer?: Comparer<T>): T | undefined;
		/**
		 * Returns the minimum value and the maximum value. If this iter is empty, this function returns undefined.
		 * @param {comparer} [comparer] A callback used to compare items. If not specified, this function uses the < and > operators to compare items.
		 * @example
		 * const result = iter(['bob', 'beth', 'sue']).minmax();
		 * // result: { min: 'beth', max: 'sue' }
		 */
        minmax(comparer?: Comparer<T>): MinmaxResult<T> | undefined;
		/**
		 * Applies a combiner/accumulator function over this iter, and returns the final value of the combination.
		 * @param {combine} combine The callback used to combine values.
		 * @param {*} [seed] The initial value of the combination. If not specified, then the initial value of the combination is the first value of the iter.
		 * @example
		 * const result = iter([1, 2, 3, 4]).fold((x, y) => x + y);
		 * // result: 10
		 * @example
		 * const result = iter([1, 2, 3, 4]).fold((x, y) => x + y, 13);
		 * // result: 23
		 * @returns {*}
		 */
		fold(combine: Combine<T, T>, seed?: T): T;
		/**
		 * Applies a combiner/accumulator function over this iter, and returns the final value of the combination.
		 * @param {combine} combine The callback used to combine values.
		 * @param {*} [seed] The initial value of the combination. If not specified, then the initial value of the combination is the first value of the iter.
		 * @example
		 * const result = iter([1, 2, 3, 4]).fold((x, y) => x + y);
		 * // result: 10
		 * @example
		 * const result = iter([1, 2, 3, 4]).fold((x, y) => x + y, 13);
		 * // result: 23
		 * @returns {*}
		 */
		fold<U>(combine: Combine<T, U>, seed: U): U;
		/**
		 * Builds an array from the values in this iter.
		 * @example
		 * const result = iter.range(1).take(3).toArray();
		 * // result: [1, 2, 3]
		 * @returns {Array}
		 */
		toArray(): T[];
		/**
		 * Builds an object from the values in this iter.
		 * @param {transformString} nameSelector A function used to get the property name from a value in this iter.
		 * @param {transform} [valueSelector] A function used to get the property value from a value in this iter. If not specified, the iter values are used as the property values.
		 * @example
		 * const result = iter.range(1).take(3).toObject(x => 'val' + x);
		 * // result: { val1: 1, val2: 2, val3: 3 }
		 * @returns {object}
		 */
		toObject(nameSelector: Transform<T, string>): { [name: string]: T };
		/**
		 * Builds an object from the values in this iter.
		 * @param {transformString} nameSelector A function used to get the property name from a value in this iter.
		 * @param {transform} [valueSelector] A function used to get the property value from a value in this iter. If not specified, the iter values are used as the property values.
		 * @example
		 * const result = iter.range(1).take(3).toObject(x => 'val' + x);
		 * // result: { val1: 1, val2: 2, val3: 3 }
		 * @returns {object}
		 */
		toObject<U>(nameSelector: Transform<T, string>, valueSelector: Transform<T, U>): { [name: string]: U };
		/**
		 * Builds a map from the values in this iter.
		 * @param {transform} keySelector A function used to get the map key from a value in this iter.
		 * @param {transform} [valueSelector] A function used to get the map value from a value in this iter. If not specified, the iter values are used as the map values.
		 * @example
		 * const result = iter.range(1).take(3).toMap(x => 'val' + x);
		 * // result: new Map([[val1, 1], [val2, 2], [val3, 3]])
		 * @returns {Map}
		 */
		toMap<K>(keySelector: Transform<T, K>): Map<K, T>;
		/**
		 * Builds a map from the values in this iter.
		 * @param {transform} keySelector A function used to get the map key from a value in this iter.
		 * @param {transform} [valueSelector] A function used to get the map value from a value in this iter. If not specified, the iter values are used as the map values.
		 * @example
		 * const result = iter.range(1).take(3).toMap(x => 'val' + x);
		 * // result: new Map([[val1, 1], [val2, 2], [val3, 3]])
		 * @returns {Map}
		 */
		toMap<K, V>(keySelector: Transform<T, K>, valueSelector: Transform<T, V>): Map<K, V>;
		/**
		 * Builds a set from the values in this iter.
		 * @example
		 * const result = iter.range(1).take(3).toSet();
		 * // result: new Set([1, 2, 3])
		 * @returns {Set}
		 */
		toSet(): Set<T>;
		/**
		 * Determines whether this iter is equivalent to another iterable (that is, they are the same length and contain equivalent values in the same positions).
		 * @param {iterable} otherIterable The other iterable.
		 * @param {equals} [equals] A callback used to determine item equality. If not specified, this function uses "Object.is".
		 * @example
		 * const result = iter([1, 2]).equal([1, 2]);
		 * // result: true
		 * @example
		 * const result = iter([1, 2]).equal([2, 2]);
		 * // result: false
		 * @returns {boolean}
		 */
		equal(other: Iterable<T>, equals?: Equals<T>): boolean;
		/**
		 * Finds the first mismatch between this iter and another iterable. Returns an object containing the value from this iter, the value from the other iter, and the index of the values. If one iterable ends before the other, that iterable's value returned as "undefined". If no mismatch is found, then this function returns undefined.
		 * @param {iterable} otherIterable The other iterable.
		 * @param {equals} [equals] A callback used to determine item equality. If not specified, this function uses "Object.is".
		 * @example
		 * const result = iter([1, 2]).findMismatch([2, 2]);
		 * // result: { lhsValue: 1, rhsValue: 2, index: 0 }
		 * @example
		 * const result = iter([1, 2]).findMismatch([1, 2]);
		 * // result: undefined
		 * @returns {mismatch_result}
		 */
        findMismatch(other: Iterable<T>, equals?: Equals<T>): MismatchResult<T> | undefined;
    }

	/**
	 * Creates an iter from an iterable object or generator function. If no argument is passed, creates an empty iter.
	 * @param {(Object|GeneratorFunction)} [fnOrObject] If undefined, the returned iter is empty. If an iterable object, the returned iter is a wrapper around that iterable. If a generator function, the returned iter is a wrapper around that function.
	 * @example
	 * const it = iter([3, 5, 7]);
	 * // 'it' contains: 3, 5, 7
	 * @example
	 * const it = iter(function *() {
	 *   yield 13;
	 *   yield 17;
	 * });
	 * // 'it' contains: 13, 17
	 * @returns {iter_type}
	 */
    export function iter<T>(fnOrObject: (Iterable<T> | Generator<T>)): Iter<T>;
    export namespace iter {
        function values<T>(...items: T[]): Iter<T>;
        function range(start: number, end?: number): Iter<number>;
        function repeat<T>(value: T, count?: number): Iter<T>;
        function concat<T>(...iterables: Iterable<T>[]): Iter<T>;
        function concat(...iterables: Iterable<any>[]): Iter<any>;
        function zip<T>(...iterables: Iterable<T>[]): Iter<T[]>;
        function zip(...iterables: Iterable<any>[]): Iter<any[]>;
        function compare<T>(lhs: Iterable<T>, rhs: Iterable<T>, comparer?: Comparer<T>): number;
        function equal<T>(lhs: Iterable<T>, rhs: Iterable<T>, equals?: Equals<T>): boolean;
        function findMismatch<T>(lhs: Iterable<T>, rhs: Iterable<T>, equals?: Equals<T>): MismatchResult<T>;
        function merge<T>(lhs: Iterable<T>, rhs: Iterable<T>, comparer?: Comparer<T>): Iter<T>;
        function setUnion<T>(lhs: Iterable<T>, rhs: Iterable<T>, comparer?: Comparer<T>): Iter<T>;
        function setIntersection<T>(lhs: Iterable<T>, rhs: Iterable<T>, comparer?: Comparer<T>): Iter<T>;
        function setSymmetricDifference<T>(lhs: Iterable<T>, rhs: Iterable<T>, comparer?: Comparer<T>): Iter<T>;
        function setDifference<T>(lhs: Iterable<T>, rhs: Iterable<T>, comparer?: Comparer<T>): Iter<T>;
        function interleave<T, U>(lhs: Iterable<T>, rhs: Iterable<U>): Iter<(T | U)>;
	}
}
