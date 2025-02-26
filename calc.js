class StringCalculator {
    static Add(numbers) {
      if (!numbers) return 0;
  
      let delimiters = [",", "\n"];
      let customDelimiterMatch = numbers.match(/^\/\/(.*)\n/);
  
      if (customDelimiterMatch) {
        let customDelimiters = customDelimiterMatch[1]
          .slice(1, -1)
          .split("][");
        delimiters.push(...customDelimiters);
        numbers = numbers.slice(customDelimiterMatch[0].length);
      } else if (numbers.startsWith("//")) {
        let customDelimiter = numbers.charAt(2);
        delimiters.push(customDelimiter);
        numbers = numbers.slice(4);
      }
  
      let delimiterRegex = new RegExp(`[${delimiters.map(d => d.replace(/[.*+?^${}()|[\/g, '\\$&')).join("")}]`);
      let numArray = numbers.split(delimiterRegex).map(num => parseInt(num, 10)).filter(num => !isNaN(num));
  
      let negatives = numArray.filter(num => num < 0);
      if (negatives.length > 0) {
        throw new Error(`Negative numbers not allowed: ${negatives.join(", ")}`);
      }
  
      return numArray.filter(num => num <= 1000).reduce((sum, num) => sum + num, 0);
    }
  }
  
  // Test Cases
  console.log(StringCalculator.Add("")); // 0
  console.log(StringCalculator.Add("1")); // 1
  console.log(StringCalculator.Add("1,2")); // 3
  console.log(StringCalculator.Add("1\n2,3")); // 6
  console.log(StringCalculator.Add("//;\n1;2")); // 3
  console.log(StringCalculator.Add("2,1001")); // 2
  console.log(StringCalculator.Add("//[***]\n1***2***3")); // 6
  console.log(StringCalculator.Add("//[*][%]\n1*2%3")); // 6
  console.log(StringCalculator.Add("//[###][@@]\n1###2@@3")); // 6
  
  try {
    console.log(StringCalculator.Add("-1,2,-3"));
  } catch (e) {
    console.error(e.message); // "Negative numbers not allowed: -1, -3"
  }
  