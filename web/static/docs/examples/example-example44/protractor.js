  var colorSpan = element(by.css('span'));

  iit('should check ng-style', function() {
    expect(colorSpan.getCssValue('color')).toBe('rgba(0, 0, 0, 1)');
    element(by.css('input[value=\'set color\']')).click();
    expect(colorSpan.getCssValue('color')).toBe('rgba(255, 0, 0, 1)');
    element(by.css('input[value=clear]')).click();
    expect(colorSpan.getCssValue('color')).toBe('rgba(0, 0, 0, 1)');
  });