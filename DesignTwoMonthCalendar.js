//==============================================================================
// Object : nexacro.TwoMonthCalendar
// Group : Component
//==============================================================================
if (nexacro.TwoMonthCalendar)
{
	//==============================================================================
	// nexacro.TwoMonthCalendar
	//==============================================================================
    var _pTwoMonthCalendar = nexacro.TwoMonthCalendar.prototype;

	_pTwoMonthCalendar.createCssDesignContents = function ()
	{
		//nexacro._CompositeComponent.prototype.createCssDesignContents.call(this);
		this.set_fromValue('19990405');
		this.set_toValue('20180510');
	};

    delete _pTwoMonthCalendar;	
	

}


