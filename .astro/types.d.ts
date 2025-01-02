declare module 'astro:content' {
	interface Render {
		'.mdoc': Promise<{
			Content(props: Record<string, any>): import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
		}>;
	}
}

declare module 'astro:content' {
	interface Render {
		'.md': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	export { z } from 'astro/zod';

	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	// This needs to be in sync with ImageMetadata
	export type ImageFunction = () => import('astro/zod').ZodObject<{
		src: import('astro/zod').ZodString;
		width: import('astro/zod').ZodNumber;
		height: import('astro/zod').ZodNumber;
		format: import('astro/zod').ZodUnion<
			[
				import('astro/zod').ZodLiteral<'png'>,
				import('astro/zod').ZodLiteral<'jpg'>,
				import('astro/zod').ZodLiteral<'jpeg'>,
				import('astro/zod').ZodLiteral<'tiff'>,
				import('astro/zod').ZodLiteral<'webp'>,
				import('astro/zod').ZodLiteral<'gif'>,
				import('astro/zod').ZodLiteral<'svg'>,
				import('astro/zod').ZodLiteral<'avif'>,
			]
		>;
	}>;

	type BaseSchemaWithoutEffects =
		| import('astro/zod').AnyZodObject
		| import('astro/zod').ZodUnion<[BaseSchemaWithoutEffects, ...BaseSchemaWithoutEffects[]]>
		| import('astro/zod').ZodDiscriminatedUnion<string, import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodIntersection<BaseSchemaWithoutEffects, BaseSchemaWithoutEffects>;

	type BaseSchema =
		| BaseSchemaWithoutEffects
		| import('astro/zod').ZodEffects<BaseSchemaWithoutEffects>;

	export type SchemaContext = { image: ImageFunction };

	type DataCollectionConfig<S extends BaseSchema> = {
		type: 'data';
		schema?: S | ((context: SchemaContext) => S);
	};

	type ContentCollectionConfig<S extends BaseSchema> = {
		type?: 'content';
		schema?: S | ((context: SchemaContext) => S);
	};

	type CollectionConfig<S> = ContentCollectionConfig<S> | DataCollectionConfig<S>;

	export function defineCollection<S extends BaseSchema>(
		input: CollectionConfig<S>
	): CollectionConfig<S>;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[]
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[]
	): Promise<CollectionEntry<C>[]>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
			  }
			: {
					collection: C;
					id: keyof DataEntryMap[C];
			  }
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"blog": {
"discarded-ideas.mdoc": {
	id: "discarded-ideas.mdoc";
  slug: "discarded-ideas";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdoc"] };
"history.mdoc": {
	id: "history.mdoc";
  slug: "history";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdoc"] };
"mapping-guide.mdoc": {
	id: "mapping-guide.mdoc";
  slug: "mapping-guide";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdoc"] };
"printing.md": {
	id: "printing.md";
  slug: "printing";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
};
"games": {
"6-nimmt.mdoc": {
	id: "6-nimmt.mdoc";
  slug: "6-nimmt";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".mdoc"] };
"alex-colt-cadete-espacial.mdoc": {
	id: "alex-colt-cadete-espacial.mdoc";
  slug: "alex-colt-cadete-espacial";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".mdoc"] };
"arboretum.mdoc": {
	id: "arboretum.mdoc";
  slug: "arboretum";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".mdoc"] };
"cheating-moth.mdoc": {
	id: "cheating-moth.mdoc";
  slug: "cheating-moth";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".mdoc"] };
"claim.mdoc": {
	id: "claim.mdoc";
  slug: "claim";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".mdoc"] };
"cockroach-poker-royal.mdoc": {
	id: "cockroach-poker-royal.mdoc";
  slug: "cockroach-poker-royal";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".mdoc"] };
"deluxe-pit.mdoc": {
	id: "deluxe-pit.mdoc";
  slug: "deluxe-pit";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".mdoc"] };
"for-sale.mdoc": {
	id: "for-sale.mdoc";
  slug: "for-sale";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".mdoc"] };
"haggis.mdoc": {
	id: "haggis.mdoc";
  slug: "haggis";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".mdoc"] };
"hanabi.mdoc": {
	id: "hanabi.mdoc";
  slug: "hanabi";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".mdoc"] };
"hanamikoji.mdoc": {
	id: "hanamikoji.mdoc";
  slug: "hanamikoji";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".mdoc"] };
"heat.mdoc": {
	id: "heat.mdoc";
  slug: "heat";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".mdoc"] };
"in-vino-morte.mdoc": {
	id: "in-vino-morte.mdoc";
  slug: "in-vino-morte";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".mdoc"] };
"jekyll-vs-hyde.mdoc": {
	id: "jekyll-vs-hyde.mdoc";
  slug: "jekyll-vs-hyde";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".mdoc"] };
"llama.mdoc": {
	id: "llama.mdoc";
  slug: "llama";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".mdoc"] };
"love-letter-premium.mdoc": {
	id: "love-letter-premium.mdoc";
  slug: "love-letter-premium";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".mdoc"] };
"mafia-de-cuba.mdoc": {
	id: "mafia-de-cuba.mdoc";
  slug: "mafia-de-cuba";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".mdoc"] };
"no-mercy.mdoc": {
	id: "no-mercy.mdoc";
  slug: "no-mercy";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".mdoc"] };
"no-thanks.mdoc": {
	id: "no-thanks.mdoc";
  slug: "no-thanks";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".mdoc"] };
"regicide.mdoc": {
	id: "regicide.mdoc";
  slug: "regicide";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".mdoc"] };
"schotten-totten.mdoc": {
	id: "schotten-totten.mdoc";
  slug: "schotten-totten";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".mdoc"] };
"secret-hitler.mdoc": {
	id: "secret-hitler.mdoc";
  slug: "secret-hitler";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".mdoc"] };
"skull.mdoc": {
	id: "skull.mdoc";
  slug: "skull";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".mdoc"] };
"spanish-deck.mdoc": {
	id: "spanish-deck.mdoc";
  slug: "spanish-deck";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".mdoc"] };
"spicy.mdoc": {
	id: "spicy.mdoc";
  slug: "spicy";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".mdoc"] };
"standard-deck.mdoc": {
	id: "standard-deck.mdoc";
  slug: "standard-deck";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".mdoc"] };
"startups.mdoc": {
	id: "startups.mdoc";
  slug: "startups";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".mdoc"] };
"taco-cat-goat-cheese-pizza.mdoc": {
	id: "taco-cat-goat-cheese-pizza.mdoc";
  slug: "taco-cat-goat-cheese-pizza";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".mdoc"] };
"ten.mdoc": {
	id: "ten.mdoc";
  slug: "ten";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".mdoc"] };
"the-crew-1.mdoc": {
	id: "the-crew-1.mdoc";
  slug: "the-crew-1";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".mdoc"] };
"the-crew-2.mdoc": {
	id: "the-crew-2.mdoc";
  slug: "the-crew-2";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".mdoc"] };
"the-game.mdoc": {
	id: "the-game.mdoc";
  slug: "the-game";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".mdoc"] };
"the-mind.mdoc": {
	id: "the-mind.mdoc";
  slug: "the-mind";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".mdoc"] };
"the-resistance-avalon.mdoc": {
	id: "the-resistance-avalon.mdoc";
  slug: "the-resistance-avalon";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".mdoc"] };
"throw-throw-burrito.mdoc": {
	id: "throw-throw-burrito.mdoc";
  slug: "throw-throw-burrito";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".mdoc"] };
"tichu.mdoc": {
	id: "tichu.mdoc";
  slug: "tichu";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".mdoc"] };
"two-rooms-and-bomb.mdoc": {
	id: "two-rooms-and-bomb.mdoc";
  slug: "two-rooms-and-bomb";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".mdoc"] };
"uno.mdoc": {
	id: "uno.mdoc";
  slug: "uno";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".mdoc"] };
"virus.mdoc": {
	id: "virus.mdoc";
  slug: "virus";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".mdoc"] };
"what-the-heck.mdoc": {
	id: "what-the-heck.mdoc";
  slug: "what-the-heck";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".mdoc"] };
"win-lose-or-banana.mdoc": {
	id: "win-lose-or-banana.mdoc";
  slug: "win-lose-or-banana";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".mdoc"] };
"yokai-pagoda.mdoc": {
	id: "yokai-pagoda.mdoc";
  slug: "yokai-pagoda";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".mdoc"] };
"you-ve-got-crabs.mdoc": {
	id: "you-ve-got-crabs.mdoc";
  slug: "you-ve-got-crabs";
  body: string;
  collection: "games";
  data: InferEntrySchema<"games">
} & { render(): Render[".mdoc"] };
};
"pages": {
"manual-v1.mdoc": {
	id: "manual-v1.mdoc";
  slug: "manual-v1";
  body: string;
  collection: "pages";
  data: any
} & { render(): Render[".mdoc"] };
"manual.mdoc": {
	id: "manual.mdoc";
  slug: "manual";
  body: string;
  collection: "pages";
  data: any
} & { render(): Render[".mdoc"] };
"privacy.mdoc": {
	id: "privacy.mdoc";
  slug: "privacy";
  body: string;
  collection: "pages";
  data: any
} & { render(): Render[".mdoc"] };
};

	};

	type DataEntryMap = {
		"gameMappings": {
"alex-colt-cadete-espacial": {
	id: "alex-colt-cadete-espacial";
  collection: "gameMappings";
  data: InferEntrySchema<"gameMappings">
};
"spicy": {
	id: "spicy";
  collection: "gameMappings";
  data: InferEntrySchema<"gameMappings">
};
};

	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	type ContentConfig = typeof import("../src/content/config");
}
