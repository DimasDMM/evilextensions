// A MatchItem defines the callback function that should be called if the URL
// matches one of the regular expressions defined in it.
type MatchItem = {
  callback: (url: string) => void;
  matches: RegExp[];
}
